import React, { memo, useState } from "react";
import {
  request,
  PluginHeader,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "strapi-helper-plugin";
import { AddCard, DataCard } from "../../components/Card";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import Block from "../../components/Block";
import { Button, Flex, InputText, Label } from "@buffetjs/core";
import { Inputs } from "@buffetjs/custom";
import WysiwygWithErrors from "../../components/WysiwygWithErrors";

function HomePage() {
  const [val, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Background>
      <Container>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <PluginHeader
            title={"Flow constructor"}
            description={"Managing flow constructors easy with us!"}
          />
          <div className="row">
            <Block
              title="General"
              description="Configure the Flow Constructor"
              style={{ marginBottom: 12 }}
            >
              <div className="row">
                <div className="col-md-4">
                  <DataCard
                    category="Leasing"
                    title="SubTopic"
                    excerpt="Subsection description"
                    edit={() => setIsOpen(true)}
                  />
                </div>
                <div className="col-md-4">
                  <DataCard
                    category="Leasing"
                    title="SubTopic"
                    excerpt="Subsection description"
                    edit={() => setIsOpen(true)}
                  />
                </div>
                <div className="col-md-4">
                  <AddCard edit={() => setIsOpen(true)} />
                </div>
              </div>
            </Block>
          </div>
          <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
            <ModalHeader
              withBackButton
              headerBreadcrumbs={["SubSection"]}
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
            </ModalBody>
            <ModalFooter>
              <section>
                <Flex>
                  <Button
                    color="cancel"
                    onClick={handleToggle}
                    className="mr-3"
                  >
                    Cancel
                  </Button>
                  <Button color="delete" onClick={handleToggle}>
                    Delete
                  </Button>
                </Flex>
                <Button color="success" onClick={handleToggle}>
                  Save
                </Button>
              </section>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    </Background>
  );
}

export default memo(HomePage);
