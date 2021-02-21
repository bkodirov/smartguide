import React, { useState } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option } from "@buffetjs/core";
import { Answer } from "./Answer";
import { Link } from "react-router-dom";
import {
  faTrashAlt,
  faLink,
  faUnlink,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pluginId from "../../pluginId";
import { LinkingNode } from "./index";

export default function EditNode({
  updateSection,
  useCase,
  node,
  handleClose,
}) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [answer, setAnswer] = useState("");
  const [link, setLink] = useState("");
  const [internalState, setInternalState] = useState({
    useCase,
    linkingAnswer: undefined,
  });
  const [val, setValue] = useState(node);

  const nodeType = node?.conclusion ? "Conclusion" : "Question";

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

  const unlinkAnswer = (data) => {
    const filteredAnswers = val.question.answers.filter(
      (answer) => answer !== data
    );
    const unlinkedAnswer = {
      _id: data._id,
      text: data.text,
    };
    setValue({
      ...val,
      question: {
        ...val.question,
        answers: [...filteredAnswers, unlinkedAnswer],
      },
    });
  };

  const addLink = () => {
    if (link === "") {
      return;
    }
    setValue({
      ...val,
      conclusion: {
        ...val.conclusion,
        links: [...val.conclusion.links, { text: link, link }],
      },
    });
    setLink("");
  };

  const deleteLink = (text) => {
    const filteredLinks = val.conclusion.links.filter(
      (link) => link.link !== text
    );
    setValue({
      ...val,
      conclusion: { ...val.conclusion, links: filteredLinks },
    });
  };

  const updateNode = async () => {
    setLoading(true);
    try {
      await request(`/nodes/${node._id}`, {
        method: "PUT",
        body: val,
      });
      setLoading(false);
      strapi.notification.success("Updated");
      handleClose();
      updateSection();
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
      console.error(error);
    }
  };

  const deleteNode = async () => {
    setLoading(true);
    try {
      await request(`/nodes/${useCase._id}/${node._id}`, {
        method: "DELETE",
      });
      setLoading(false);
      strapi.notification.success("Node deleted");
      handleClose();
      updateSection();
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
      console.error(error);
    }
  };

  const isLinkedAnswer = (answer) => {
    if (answer.hasOwnProperty("node_id") && !(answer.node_id === "")) {
      return true;
    } else {
      return false;
    }
  };

  const handleAnswer = (answer) => {
    // If a new Answer created ask for save
    if (answer.hasOwnProperty("_id")) {
      setInternalState({ ...internalState, linkingAnswer: answer });
    } else {
      strapi.notification.info("Please save the node changes first");
    }
  };

  const closeModal = () => {
    if (val === node) {
      handleClose();
    } else {
      strapi.notification.info(
        "Please save your node changes first. If you don't want to save the changes, click Cancel"
      );
    }
  };

  console.log(`Re-rendering a view. linking = ${internalState.linkingAnswer}`);
  return (
    <>
      <Modal isOpen={true} onToggle={closeModal} onClosed={handleClose}>
        <ModalHeader
          withBackButton
          headerBreadcrumbs={[nodeType]}
          onClickGoBack={closeModal}
        />
        <ModalBody>
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
                  value={val.conclusion?.text}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Label htmlFor="link">Links</Label>
                <InputText
                  name="link"
                  onChange={({ target: { value } }) => {
                    setLink(value);
                  }}
                  placeholder="Add new link"
                  type="text"
                  value={link}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addLink();
                    }
                  }}
                />
              </div>
              <div className="col-md-12 mb-5">
                {val.conclusion.links?.map((item, index) => (
                  <Answer key={index}>
                    <div className="answer_block">
                      <Link to={`/plugins/${pluginId}/use_case/${useCase._id}`}>
                        {item.text}
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => deleteLink(item.text)}
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
                  value={val.question?.explanation}
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
                  value={val.question?.question_text}
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
                {val.question?.answers?.map((item, index) => (
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
                      {isLinkedAnswer(item) ? (
                        <FontAwesomeIcon
                          icon={faLink}
                          onClick={() => unlinkAnswer(item)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faUnlink}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAnswer(item);
                          }}
                        />
                      )}
                    </div>
                    {isLinkedAnswer(item) ? (
                      <>
                        <span className="arrow">
                          <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </span>
                        <div className="node_card">Question or Conclusion</div>
                      </>
                    ) : (
                      ""
                    )}
                  </Answer>
                ))}
              </div>
              <div className="col-md-12">
                <Label htmlFor="tag">Tags</Label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {val.question?.tags?.map((tag, index) => (
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
              <Button color="delete" onClick={deleteNode}>
                Delete
              </Button>
            </Flex>
            <Button color="success" onClick={updateNode} isLoading={loading}>
              Save
            </Button>
          </section>
        </ModalFooter>
      </Modal>
      {internalState.linkingAnswer && (
        <LinkingNode
          useCase={useCase}
          answer={internalState.linkingAnswer}
          onSave={(node, answer) => {
            answer.node_id = node._id;
            setInternalState({ ...internalState, linkingAnswer: undefined });
            updateNode();
            setLoading(true);
          }}
          onClose={(event) => {
            setInternalState({ ...internalState, linkingAnswer: undefined });
          }}
          onNewNode={() => console.log("onNewNode")}
        />
      )}
    </>
  );
}
