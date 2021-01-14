import React, { useState, useEffect } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option } from "@buffetjs/core";
import { Inputs } from "@buffetjs/custom";
import WysiwygWithErrors from "../../components/WysiwygWithErrors";

export default function ModalView({
  isOpen,
  handleClose,
  handleToggle,
  richText,
  deleteAction,
  name,
  tags,
  handleSubmit,
  data,
}) {
  const [tag, setTag] = useState("");
  const [val, setValue] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const addTags = () => {
    setValue({ ...val, tags: [...val.tags, tag] });
    setTag("");
  };

  useEffect(() => {
    setValue({ ...val, title: data.title, tags: data.tags });
  }, [data]);

  const onSave = () => {
    if (richText) {
      handleSubmit(val);
    } else {
      handleSubmit({
        title: val.title,
        tags: val.tags,
      });
    }
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader
        withBackButton
        headerBreadcrumbs={name}
        onClickGoBack={handleClose}
      />
      <ModalBody>
        <form style={{ display: "block", width: "100%" }} onSubmit={onSave}>
          <div className="col-md-6 mb-5">
            <Label htmlFor="name">Name</Label>
            <InputText
              name="name"
              onChange={({ target: { value } }) => {
                setValue({ ...val, title: value });
              }}
              type="text"
              value={val.title}
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
                  setValue({ ...val, description: value });
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
                value={val.description}
              />
            </div>
          )}
          {tags && (
            <div className="col-md-12">
              <Label htmlFor="tag">Tags</Label>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {val.tags?.map((tag, index) => (
                  <Option key={index} label={tag} margin="0 10px 6px 0" />
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
          )}
        </form>
      </ModalBody>
      <ModalFooter>
        <section>
          <Flex>
            <Button color="cancel" onClick={handleToggle} className="mr-3">
              Cancel
            </Button>
            {deleteAction && (
              <Button color="delete" onClick={handleToggle}>
                Delete
              </Button>
            )}
          </Flex>
          <Button color="success" onClick={onSave}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
