import React, { useState, useEffect } from "react";
import {
  request,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { Button, Flex, InputText, Label, Option } from "@buffetjs/core";

export default function AddCard(
  {
    isOpen,
    handleClose,
    handleToggle,
    updateSection,
    sectionId,
    parentCardId,
    tags
  }
) {
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState("");
  const [val, setValue] = useState({
    title: "",
    tags: tags,
    cards: [],
    use_cases: [],
  });

  useEffect(() => {
    setValue({ ...val, section_id: sectionId });
  }, [sectionId]);

  useEffect(() => {
    setValue({ ...val, parent_card_id: parentCardId });
  }, [parentCardId]);

  const addTags = () => {
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

  const createNewCard = async () => {
    setLoading(true);
    try {
      await request("/cards", {
        method: "POST",
        body: val,
      });
      setLoading(false);
      strapi.notification.success("Saved");
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
        headerBreadcrumbs={["SubSection"]}
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
              {val.tags?.map((tag, index) => (
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
          <Button color="success" onClick={createNewCard} isLoading={loading}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
