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
import {LinkingNode} from "./index";

export default function EditNode({ updateSection, useCase, node , handleClose}) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [answer, setAnswer] = useState("");
  const [internalState, setInternalState] = useState({useCase, linkingAnswer: undefined});

  const [val, setValue] = useState(node);

  useEffect(() => {

  }, [internalState]);

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
      await request(`/nodes/${node._id}`, {
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

  const deleteNode = async () => {
    setLoading(true);
    try {
      await request(`/nodes/${node._id}`, {
        method: "DELETE",
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


  const handleAnswer = (answer) => {
    // If a new Answer created ask for save
    // if (dirtyAnswerExists) {
    //   strapi.notification.show('Please save the node changes first')
    // }
    setInternalState({...internalState, linkingAnswer: answer})
  };

  console.log(`Re-rendering a view. linking = ${internalState.linkingAnswer}`)
  return (
    <>
      <Modal
        isOpen={true}
        onToggle={handleClose}
        onClosed={handleClose}
      >
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
            <div className="col-md-6 mb-5">
              {val.question?.answers?.map((item, index) => (
                <Answer key={index}>
                  <Link
                    to={`/plugins/${pluginId}/use_case/${val.use_case_id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAnswer(item)
                    }}
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
      {
        internalState.linkingAnswer && <LinkingNode
          useCase={useCase}
          answer={internalState.linkingAnswer}
          onSave={(node, answer) => {
            answer.node_id = node._id
            setInternalState({...internalState, linkingAnswer: undefined})
            updateNode()
            setLoading(true)
          }}
          onClose={(event) => {
            setInternalState({...internalState, linkingAnswer: undefined})
          }}
          onNewNode={() => console.log('onNewNode')}
        />
      }
    </>
  );
}
