import React, { memo, useState } from "react";
import { request } from "strapi-helper-plugin";
import { DataCard, UseCaseCard } from "../../components/Card";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import Block from "../../components/Block";
import { Header } from "@buffetjs/custom";
import ModalView from "../../components/ModalView";
import { Option, InputText } from "@buffetjs/core";

function SectionPage() {
  const [val, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const addTags = (event) => {
    event.preventDefault();
    setTags([...tags, val]);
    setValue("");
  };
  return (
    <Background>
      <Container>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <Header
            title={{
              label: "Section one",
            }}
            content="Managing flow constructors easy with us!"
          />
          <div className="row">
            <Block
              title="SubSections"
              description="Configure the Flow Constructor"
              style={{ marginBottom: 24 }}
              action={handleToggle}
            >
              <div className="row">
                <div className="col-md-4">
                  <DataCard
                    category="Leasing"
                    title="SubTopic"
                    excerpt="Subsection description"
                    edit={handleToggle}
                  />
                </div>
                <div className="col-md-4">
                  <DataCard
                    category="Leasing"
                    title="SubTopic"
                    excerpt="Subsection description"
                    edit={handleToggle}
                  />
                </div>
                <div className="col-md-4">
                  <DataCard
                    category="Leasing"
                    title="SubTopic"
                    excerpt="Subsection description"
                    edit={handleToggle}
                  />
                </div>
              </div>
            </Block>
          </div>

          <div className="row">
            <Block
              title="UseCases"
              description="Configure the Flow Constructor"
              style={{ marginBottom: 16 }}
              action={handleToggle}
            >
              <div className="row">
                <div className="col-md-3">
                  <UseCaseCard
                    title="Lease classification use section"
                    edit={handleToggle}
                  />
                </div>
                <div className="col-md-3">
                  <UseCaseCard title="UseCase name" edit={handleToggle} />
                </div>
              </div>
            </Block>
          </div>

          <div className="row">
            <Block title="Tags" description="" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Option label="Tag" margin="0 10px 6px 0" />
                {tags.map((tag, index) => (
                  <Option key={index} label={tag} margin="0 10px 6px 0" />
                ))}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={addTags}>
                    <InputText
                      name="tag"
                      onChange={({ target: { value } }) => {
                        setValue(value);
                      }}
                      placeholder="tags..."
                      type="text"
                      value={val}
                    />
                  </form>
                </div>
              </div>
            </Block>
          </div>

          <ModalView
            isOpen={isOpen}
            handleClose={handleClose}
            handleToggle={handleToggle}
            name={["Subsection"]}
            richText
            deleteAction
          />
        </div>
      </Container>
    </Background>
  );
}

export default memo(SectionPage);
