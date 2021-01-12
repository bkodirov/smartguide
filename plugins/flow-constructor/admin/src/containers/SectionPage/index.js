import React, { memo, useState } from "react";
import { request } from "strapi-helper-plugin";
import { AddCard, DataCard } from "../../components/Card";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import Block from "../../components/Block";
import { Header } from "@buffetjs/custom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
              label: "Flow constructor",
            }}
            content="Managing flow constructors easy with us!"
            actions={[
              {
                label: "Add new section",
                onClick: () => alert("Add button clicked"),
                color: "primary",
                type: "button",
                icon: <FontAwesomeIcon icon={faPlus} />,
              },
            ]}
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
