import React, { useState, useEffect } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option } from "@buffetjs/core";

export default function EditSection({
  isOpen,
  handleClose,
  handleToggle,
  updateSection,
  data,
}) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [val, setValue] = useState({
    title: "",
    tags: [],
  });

  useEffect(() => {
    setValue({ title: data.title, tags: data.tags });
  }, [data]);

  const addTag = () => {
    if (tag === "") {
      return;
    }
    setValue({ ...val, tags: [...val.tags, tag] });
    setTag("");
  };

  const deleteTag = (id) => {
    const filteredTags = val.tags.filter((tag) => tag !== id);
    setValue({ ...val, tags: filteredTags });
  };

  const sectionUpdate = async () => {
    setLoading(true);
    try {
      await request(`/sections/${data._id}`, {
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

  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader
        withBackButton
        headerBreadcrumbs={["Section"]}
        onClickGoBack={handleClose}
      />
      <ModalBody>
        <form style={{ display: "block", width: "100%" }}>
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
          <div className="col-md-12">
            <Label htmlFor="tag">Tags</Label>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {val.tags?.map((tag, id) => (
                <Option
                  key={id}
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
                      addTag();
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
          <Button color="success" onClick={sectionUpdate} isLoading={loading}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
