import React, { useState, useEffect } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option } from "@buffetjs/core";

export default function EditUseCase({
  isOpen,
  handleClose,
  handleToggle,
  updateSection,
  data,
  parentCardId,
}) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [val, setValue] = useState({
    parent_card_id: "",
    title: "",
    tags: [],
    nodes: [],
  });

  useEffect(() => {
    setValue({
      ...val,
      title: data.title,
      tags: data.tags,
      parent_card_id: parentCardId,
    });
  }, [data, parentCardId]);

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

  const useCaseUpdate = async () => {
    setLoading(true);
    try {
      await request(`/use_cases/${data._id}`, {
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

  const useCaseDelete = async () => {
    setLoading(true);
    try {
      await request(`/use_cases/${data._id}`, {
        method: "DELETE",
      });
      setLoading(false);
      strapi.notification.success("Deleted");
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
        headerBreadcrumbs={["Use case"]}
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
            <Button color="delete" onClick={useCaseDelete}>
              Delete
            </Button>
          </Flex>
          <Button color="success" onClick={useCaseUpdate} isLoading={loading}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
