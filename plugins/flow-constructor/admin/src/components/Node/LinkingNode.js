import React, {useState} from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, Label, Select } from "@buffetjs/core";
import {prepareNodes} from "./utils";

export default function LinkingNode({useCase, answer, onSave, onClose, onNewNode}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {unlinkedNodes, linkedNodes, invalidQuestions, nodeMap} = prepareNodes(useCase)
  const options = unlinkedNodes?.map(node => node.question?.question_text || node.conclusion?.text) || [];

  return (
    <Modal
      isOpen={true}
      onToggle={onClose}
      onClosed={onClose}
    >
      <ModalHeader
        withBackButton
        headerBreadcrumbs={["Linking to the question"]}
        onClickGoBack={onClose}
      />
      <ModalBody>
        <form style={{ display: "block", width: "100%" }}>
          <div className="col-md-6 mb-5">
            <Label htmlFor="question">Question</Label>
            <Select
              name="question"
              onChange={(event) => {
                setSelectedIndex(event.target.selectedIndex)
              }}
              options={options}
              value={options[selectedIndex]}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <section>
          {/*<Flex>*/}
          {/*  <Button color="primary" onClick={onNewNode} className="mr-3">*/}
          {/*    New Question*/}
          {/*  </Button>*/}
          {/*  <Button color="cancel" onClick={onNewNode} className="mr-3">*/}
          {/*    New Conclusion*/}
          {/*  </Button>*/}
          {/*</Flex>*/}
          <Button color="success" onClick={() => {
            onSave(unlinkedNodes[selectedIndex], answer)
          }}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
