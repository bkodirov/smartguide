import React, { memo, useState } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List } from "@buffetjs/custom";
import {
  faTrashAlt,
  faPencilAlt,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import ListRow from "../../components/ListRow";
import { useHistory } from "react-router-dom";
import pluginId from "../../pluginId";
import ModalView from "../../components/ModalView";

function HomePage() {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const props = {
    title: "Sections",
    subtitle: "Subtitle",
    button: {
      color: "secondary",
      icon: true,
      label: "New",
      onClick: () => handleToggle(),
      type: "button",
    },
  };

  const handleEditClick = (e) => {
    alert("Edit");
    e.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    alert("Delete");
    e.stopPropagation();
  };

  const rows = [
    {
      icon: "1.",
      name: "Section one",
      description: "Section one description.",
      links: [
        {
          icon: <FontAwesomeIcon icon={faPencilAlt} />,
          onClick: handleEditClick,
        },
        {
          icon: <FontAwesomeIcon icon={faTrashAlt} />,
          onClick: handleDeleteClick,
        },
      ],
      onClick: () => history.push(`/plugins/${pluginId}/section`),
    },
    {
      icon: "2.",
      name: "Section two",
      description: "Section two description.",
      links: [
        {
          icon: <FontAwesomeIcon icon={faPencilAlt} />,
          onClick: handleEditClick,
        },
        {
          icon: <FontAwesomeIcon icon={faTrashAlt} />,
          onClick: handleDeleteClick,
        },
      ],
      onClick: () => history.push(`/plugins/${pluginId}/section`),
    },
  ];

  return (
    <Background>
      <Container>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <Header
            title={{
              label: "Flow constructor",
            }}
            content="Managing flow constructors easy with us!"
          />
          <div className="row">
            <div className="col-md-12">
              <List
                {...props}
                items={rows}
                customRowComponent={(props) => <ListRow {...props} />}
              />
            </div>
          </div>
          <ModalView
            isOpen={isOpen}
            handleClose={handleClose}
            handleToggle={handleToggle}
            name={["Section"]}
          />
        </div>
      </Container>
    </Background>
  );
}

export default memo(HomePage);
