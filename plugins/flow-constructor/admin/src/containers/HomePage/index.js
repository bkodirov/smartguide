import React, { memo, useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (data) => {
    setIsOpen(!isOpen);
    if (data) {
      setCurrentSection(data);
    } else {
      setCurrentSection({});
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const getAllSections = async () => {
    setLoading(true);
    try {
      const response = await request("/sections", {
        method: "GET",
      });
      setLoading(false);
      setSections(response);
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  const createNewSection = async (data) => {
    setLoading(true);
    try {
      const response = await request("/sections", {
        method: "POST",
        body: data,
      });
      setLoading(false);
      setSections(response);
      strapi.notification.success("Saved");
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  useEffect(() => {
    getAllSections();
  }, []);

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
    isLoading: loading,
  };

  const handleEditClick = (event, data) => {
    handleToggle(data);
    event.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    alert("Delete");
    e.stopPropagation();
  };

  const rows = sections.map((item, index) => {
    return {
      icon: `${index + 1}.`,
      name: item.title,
      description: item._id,
      links: [
        {
          icon: <FontAwesomeIcon icon={faPencilAlt} />,
          onClick: (event) => handleEditClick(event, item),
        },
        {
          icon: <FontAwesomeIcon icon={faTrashAlt} />,
          onClick: handleDeleteClick,
        },
      ],
      onClick: () => history.push(`/plugins/${pluginId}/section`),
    };
  });

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
            tags
            handleSubmit={createNewSection}
            data={currentSection}
          />
        </div>
      </Container>
    </Background>
  );
}

export default memo(HomePage);
