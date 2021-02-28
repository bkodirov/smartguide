import React, { useState, useEffect } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option, Select } from "@buffetjs/core";
import { Answer } from "./Answer";
import { Link } from "react-router-dom";
import {
  faTrashAlt,
  faUnlink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pluginId from "../../pluginId";
import ArticleLinker from "./ArticleLinker";

export default function AddNode({ updateSection, useCase, handleClose }) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [answer, setAnswer] = useState("");
  const [nodeType, setNodeType] = useState("Question");
  const [articleModal, setArticleModal] = useState(false);
  const [val, setValue] = useState({
    use_case_id: "",
    question: {
      explanation: "",
      question_text: "",
      tags: [],
      answers: [],
    },
    conclusion: {
      text: "",
      articles: [],
      tags: [],
    },
  });

  useEffect(() => {
    setValue({
      ...val,
      use_case_id: useCase._id,
      question: { ...val.question, tags: useCase.tags },
    });
  }, [useCase]);

  const addTags = () => {
    if (tag === "") {
      return;
    }

    if (nodeType === "Conclusion") {
      setValue({
        ...val,
        conclusion: { ...val.conclusion, tags: [...val.conclusion.tags, tag] },
      });
    } else {
      setValue({
        ...val,
        question: { ...val.question, tags: [...val.question.tags, tag] },
      });
    }
    setTag("");
  };

  const deleteTag = (id) => {
    const filteredTags = val.question.tags.filter((tag) => tag !== id);
    setValue({ ...val, question: { ...val.question, tags: filteredTags } });
  };

  const addAnswer = () => {
    if (answer === "") {
      return;
    }
    setValue({
      ...val,
      question: {
        ...val.question,
        answers: [...val.question.answers, { text: answer }],
      },
    });
    setAnswer("");
  };

  const deleteAnswer = (text) => {
    const filteredAnswers = val.question.answers.filter(
      (answer) => answer.text !== text
    );
    setValue({
      ...val,
      question: { ...val.question, answers: filteredAnswers },
    });
  };

  const addArticle = (article) => {
    setValue({
      ...val,
      conclusion: {
        ...val.conclusion,
        articles: [...val.conclusion.articles, article],
      },
    });
  };

  const deleteArticle = (id) => {
    const filteredArticles = val.conclusion.articles.filter(
      (article) => article._id !== id
    );
    setValue({
      ...val,
      conclusion: { ...val.conclusion, articles: filteredArticles },
    });
  };

  const createNewNode = async () => {
    setLoading(true);

    const questionData = {
      use_case_id: val.use_case_id,
      question: val.question,
    };

    const conclusionData = {
      use_case_id: val.use_case_id,
      conclusion: val.conclusion,
    };

    try {
      await request("/nodes", {
        method: "POST",
        body: nodeType === "Conclusion" ? conclusionData : questionData,
      });
      setLoading(false);
      strapi.notification.success("Created");
      handleClose();
      updateSection();
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
      console.error(error);
    }
  };

  const handleAnswer = () => {
    strapi.notification.info("Please save the node changes first");
  };

  return (
    <>
      <Modal isOpen={true} onToggle={handleClose} onClosed={handleClose}>
        <ModalHeader
          withBackButton
          headerBreadcrumbs={[nodeType]}
          onClickGoBack={handleClose}
        />
        <ModalBody>
          <div className="col-md-6 mb-5">
            <Label htmlFor="node_type">Node type</Label>
            <Select
              name="node_type"
              onChange={({ target: { value } }) => {
                setNodeType(value);
              }}
              options={["Question", "Conclusion"]}
              value={nodeType}
            />
          </div>
          {nodeType === "Conclusion" ? (
            <form style={{ display: "block", width: "100%" }}>
              <div className="col-md-6 mb-5">
                <Label htmlFor="conclusion">Conclusion</Label>
                <InputText
                  name="conclusion"
                  onChange={({ target: { value } }) => {
                    setValue({
                      ...val,
                      conclusion: { ...val.conclusion, text: value },
                    });
                  }}
                  type="text"
                  value={val.conclusion.text}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Flex alignItems="center">
                  <Label htmlFor="article">Articles</Label>
                  <InputText
                    name="article"
                    placeholder="Add new article"
                    type="hidden"
                  />
                  <Button
                    color="secondary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    label=""
                    onClick={() => setArticleModal(true)}
                  />
                </Flex>
              </div>
              <div className="col-md-12 mb-5">
                {val.conclusion.articles?.length > 0 &&
                  val.conclusion.articles.map((item, index) => (
                    <Answer key={index}>
                      <div className="answer_block">
                        <Link
                          to={`/plugins/${pluginId}/use_case/${val.use_case_id}`}
                        >
                          {item.text}
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => deleteArticle(item._id)}
                        />
                      </div>
                    </Answer>
                  ))}
              </div>
              <div className="col-md-12">
                <Label htmlFor="tag">Tags</Label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {val.conclusion.tags?.map((tag, index) => (
                    <Option
                      key={index}
                      label={tag}
                      margin="0 10px 6px 0"
                      onClick={() => deleteTag(tag)}
                    />
                  ))}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputText
                      name="tag"
                      onChange={({ target: { value } }) => {
                        setTag(value);
                      }}
                      placeholder="tags..."
                      type="text"
                      value={tag}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          addTags();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form style={{ display: "block", width: "100%" }}>
              <div className="col-md-6 mb-5">
                <Label htmlFor="explanation">Explanation</Label>
                <InputText
                  name="explanation"
                  onChange={({ target: { value } }) => {
                    setValue({
                      ...val,
                      question: { ...val.question, explanation: value },
                    });
                  }}
                  type="text"
                  value={val.question.explanation}
                />
              </div>
              <div className="col-md-6 mb-5">
                <Label htmlFor="question_text">Question</Label>
                <InputText
                  name="question_text"
                  onChange={({ target: { value } }) => {
                    setValue({
                      ...val,
                      question: { ...val.question, question_text: value },
                    });
                  }}
                  type="text"
                  value={val.question.question_text}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Label htmlFor="answer">Answers</Label>
                <InputText
                  name="answer"
                  onChange={({ target: { value } }) => {
                    setAnswer(value);
                  }}
                  placeholder="Add new answer"
                  type="text"
                  value={answer}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addAnswer();
                    }
                  }}
                />
              </div>
              <div className="col-md-12 mb-5">
                {val.question.answers?.map((item, index) => (
                  <Answer key={index} color="#F64D0A">
                    <div className="answer_block">
                      <Link
                        to={`/plugins/${pluginId}/use_case/${val.use_case_id}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAnswer(item);
                        }}
                      >
                        {item.text}
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => deleteAnswer(item.text)}
                      />
                      <FontAwesomeIcon
                        icon={faUnlink}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAnswer(item);
                        }}
                      />
                    </div>
                  </Answer>
                ))}
              </div>
              <div className="col-md-12">
                <Label htmlFor="tag">Tags</Label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {val.question.tags?.map((tag, index) => (
                    <Option
                      key={index}
                      label={tag}
                      margin="0 10px 6px 0"
                      onClick={() => deleteTag(tag)}
                    />
                  ))}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputText
                      name="tag"
                      onChange={({ target: { value } }) => {
                        setTag(value);
                      }}
                      placeholder="tags..."
                      type="text"
                      value={tag}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          addTags();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <section>
            <Flex>
              <Button color="cancel" onClick={handleClose} className="mr-3">
                Cancel
              </Button>
            </Flex>
            <Button color="success" onClick={createNewNode} isLoading={loading}>
              Save
            </Button>
          </section>
        </ModalFooter>
      </Modal>
      {articleModal && (
        <ArticleLinker
          onSave={addArticle}
          onClose={() => setArticleModal(false)}
        />
      )}
    </>
  );
}
