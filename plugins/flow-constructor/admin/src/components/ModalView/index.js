import React, { useState } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label } from "@buffetjs/core";
import { Inputs } from "@buffetjs/custom";
import WysiwygWithErrors from "../../components/WysiwygWithErrors";

export default function ModalView({
  isOpen,
  handleClose,
  handleToggle,
  richText,
  deleteAction,
  name
}) {
  const [val, setValue] = useState("");
  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader
        withBackButton
        headerBreadcrumbs={name}
        onClickGoBack={handleClose}
      />
      <ModalBody>
        <div className="col-md-6 mb-5">
          <Label htmlFor="name">Name</Label>
          <InputText
            name="name"
            onChange={({ target: { value } }) => {
              setValue(value);
            }}
            type="text"
            value={val}
          />
        </div>
        {richText && (
          <div className="col-md-12">
            <Inputs
              customInputs={{ wysiwyg: WysiwygWithErrors }} // Props to pass custom input type to the component
              name="description"
              type="wysiwyg"
              label="Description"
              onChange={({ target: { value } }) => {
                setValue(value);
              }}
              translatedErrors={{
                date: "This is not a date",
                email: "This is not an email",
                string: "This is not a string",
                number: "This is not a number",
                json: "This is not a JSON",
                max: "This is too high",
                maxLength: "This is too long",
                min: "This is too small",
                minLength: "This is too short",
                required: "This value is required",
                regex: "This does not match the format",
                uppercase: "This must be a upper case string",
              }}
              value={val}
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <section>
          <Flex>
            <Button color="cancel" onClick={handleToggle} className="mr-3">
              Cancel
            </Button>
            {deleteAction && <Button color="delete" onClick={handleToggle}>
              Delete
            </Button>}
          </Flex>
          <Button color="success" onClick={handleToggle}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
