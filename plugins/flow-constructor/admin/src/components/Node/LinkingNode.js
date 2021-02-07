import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, Label, Select } from "@buffetjs/core";
import Context from "../../contexts/Context";

export default function LinkingNode({ nodes }) {
  const { state, dispatch } = useContext(Context);
  const [val, setValue] = useState("child question");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const questions = nodes?.map((node) => {
      return node.question.question_text;
    });
    setOptions(questions);
  }, [nodes]);

  const onSave = () => {
    handleClose();
  };

  const handleToggle = () => {
    dispatch({
      type: "toggle_linking_modal",
      payload: {},
    });
  };
  const handleClose = () => {
    dispatch({
      type: "close_modal",
    });
  };

  return (
    <Modal
      isOpen={state?.modal?.isLinkingModalOpen}
      onToggle={handleToggle}
      onClosed={handleClose}
    >
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
