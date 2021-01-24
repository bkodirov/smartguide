import React, { useState, useEffect } from "react";
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
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pluginId from "../../pluginId";

export default function EditNode({
  isOpen,
  handleClose,
  handleToggle,
  updateSection,
  parentNodeId,
  useCaseId,
  data,
}) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [answer, setAnswer] = useState("");
  const [val, setValue] = useState({
    parent_node_id: "",
    use_case_id: "",
    question: {
      explanation: "",
      question_text: "",
      tags: [],
      answers: [],
    },
    // conclusion: {
    //   text: "",
    //   links: [
    //     {
    //       text: "",
    //       link: "",
    //     },
    //   ],
    //   tags: [],
    // },
  });

  useEffect(() => {
    setValue({
      ...val,
      use_case_id: useCaseId,
      question: data.question,
    });
  }, [data, useCaseId]);

  const addTags = () => {
    if (tag === "") {
      return;
    }
    setValue({
      ...val,
      question: { ...val.question, tags: [...val.question.tags, tag] },
    });
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

  const updateNode = async () => {
    setLoading(true);
    try {
      await request(`/nodes/${data._id}`, {
        method: "PUT",
        body: val,
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

  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader
        withBackButton
        headerBreadcrumbs={["Question"]}
        onClickGoBack={handleClose}
      />
      <ModalBody>
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
          <div className="col-md-6 mb-5">
            {val.question.answers?.map((item, index) => (
              <Answer key={index}>
                <Link
                  to={`/plugins/${pluginId}/use_case/${useCaseId}?node=${parentNodeId}`}
                >
                  {item.text}
                </Link>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => deleteAnswer(item.text)}
                />
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
      </ModalBody>
      <ModalFooter>
        <section>
          <Flex>
            <Button color="cancel" onClick={handleToggle} className="mr-3">
              Cancel
            </Button>
          </Flex>
          <Button color="success" onClick={updateNode} isLoading={loading}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
