import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List } from "@buffetjs/custom";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import ListRow from "../../components/ListRow";
import { useHistory } from "react-router-dom";
import pluginId from "../../pluginId";
import {
  AddSection,
  DeleteSection,
  EditSection,
} from "../../components/Section";

function HomePage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditToggle = (data) => {
    setIsEditModalOpen(!isEditModalOpen);
    if (data) {
      setCurrentSection(data);
    } else {
      setCurrentSection({});
    }
  };
  const handleAddToggle = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const handleDeleteToggle = (data) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    if (data) {
      setCurrentSection(data);
    } else {
      setCurrentSection({});
    }
  };
  const handleClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const getAllSections = async () => {
    setLoading(true);
    try {
      const response = await request("/sections", {
        method: "GET",
      });
      setLoading(false);
      setSections(response);
      console.log("getAllSections => ", response);
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
      onClick: () => handleAddToggle(),
      type: "button",
    },
    isLoading: loading,
  };

  const handleEditClick = (event, data) => {
    handleEditToggle(data);
    event.stopPropagation();
  };

  const handleDeleteClick = (event, data) => {
    handleDeleteToggle(data);
    event.stopPropagation();
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
          onClick: (event) => handleDeleteClick(event, item),
        },
      ],
      onClick: () => history.push(`/plugins/${pluginId}/section/${item._id}`),
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
          <AddSection
            isOpen={isAddModalOpen}
            handleClose={handleClose}
            handleToggle={handleAddToggle}
            updateSection={() => getAllSections()}
          />
          <EditSection
            isOpen={isEditModalOpen}
            handleClose={handleClose}
            handleToggle={handleEditToggle}
            updateSection={() => getAllSections()}
            data={currentSection}
          />
          <DeleteSection
            isOpen={isDeleteModalOpen}
            handleClose={handleClose}
            handleToggle={handleDeleteToggle}
            updateSection={() => getAllSections()}
            data={currentSection}
          />
        </div>
      </Container>
    </Background>
  );
}

export default memo(HomePage);
