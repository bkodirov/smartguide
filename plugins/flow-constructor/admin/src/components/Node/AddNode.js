import React, { useState, useEffect } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option } from "@buffetjs/core";

export default function AddNode({
  isOpen,
  handleClose,
  handleToggle,
  updateSection,
  parentNodeId,
  tags,
}) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [val, setValue] = useState({
    parent_node_id: "",
    question: {
      explanation: "",
      question_text: "",
      tags: [],
      answers: [
        {
          text: "",
        },
      ],
    },
  });

  useEffect(() => {
    setValue({
      ...val,
      parent_node_id: parentNodeId,
      question: { ...val.question, tags },
    });
  }, [parentNodeId, tags]);

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
    const filteredTags = val.tags.filter((tag) => tag !== id);
    setValue({ ...val, question: { ...val.question, tags: filteredTags } });
  };

  const createNewNode = async () => {
    setLoading(true);
    try {
      await request("/nodes", {
        method: "POST",
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
        headerBreadcrumbs={["Node"]}
        onClickGoBack={handleClose}
      />
      <ModalBody>
        <form style={{ display: "block", width: "100%" }}>
          <div className="col-md-6 mb-5">
            <Label htmlFor="explanation">Explanation</Label>
            <InputText
              name="explanation"
              onChange={({ target: { value } }) => {
                setValue({ ...val, question: { explanation: value } });
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
                setValue({ ...val, question: { question_text: value } });
              }}
              type="text"
              value={val.question.question_text}
            />
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
          <Button color="success" onClick={createNewNode} isLoading={loading}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
