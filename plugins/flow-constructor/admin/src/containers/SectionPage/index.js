import React, { memo, useState } from "react";
import { request } from "strapi-helper-plugin";
import { DataCard, UseCaseCard } from "../../components/Card";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import Block from "../../components/Block";
import { Header } from "@buffetjs/custom";
import ModalView from "../../components/ModalView";

function SectionPage() {
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
                  <UseCaseCard
                    title="UseCase name"
                    edit={handleToggle}
                  />
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
