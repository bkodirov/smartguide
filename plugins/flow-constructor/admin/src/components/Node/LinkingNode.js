import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Select } from "@buffetjs/core";

export default function LinkingNode({
  isOpen,
  handleClose,
  handleToggle,
  nodes,
  answer,
  handleLinkingNode,
}) {
  const [val, setValue] = useState("child question");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const questions = nodes?.map((node) => {
      return node.question.question_text;
    });
    setOptions(questions);
  }, [nodes]);

  const onSave = () => {
    const question = nodes.find((node) => node.question.question_text === val);
    handleLinkingNode({ text: answer.text, node_id: question._id });
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader
        withBackButton
        headerBreadcrumbs={["Linking to the question"]}
        onClickGoBack={handleClose}
      />
      <ModalBody>
        <form style={{ display: "block", width: "100%" }}>
          <div className="col-md-6 mb-5">
            <Label htmlFor="question">Question</Label>
            <Select
              name="question"
              onChange={({ target: { value } }) => {
                setValue(value);
              }}
              options={options}
              value={val}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <section>
          <Flex>
            <Button color="primary" onClick={handleToggle} className="mr-3">
              New Question
            </Button>
            <Button color="cancel" onClick={handleToggle} className="mr-3">
              New Conclusion
            </Button>
          </Flex>
          <Button color="success" onClick={onSave}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
