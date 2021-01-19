import React, { useState } from "react";
import { DataCard } from "../../components/Card";
import Block from "../../components/Block";
import { AddCard, EditCard } from "../../components/SubSection";

export default function CardSection({ data, updateSection, recursive }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState({});

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
  const handleClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const cards = data.parent_section ? data.parent_section?.cards : data.parent_card?.cards;
  const tags = data.parent_section?.tags || data.parent_card?.tags;
  return (
    <div className="row">
      <Block
        title={ data.parent_section ? data.parent_section?.title : data.parent_card?.title }
        description="Configure the Flow Constructor"
        style={{ marginBottom: 24 }}
        action={handleAddToggle}
      >
        <div className="row">
          {cards?.map((card, index) => (
            <div key={index} className="col-md-4">
              <DataCard
                category="Leasing"
                title={card.title}
                excerpt="Subsection description"
                edit={() => handleEditToggle(card)}
                cardId={card._id}
              />
            </div>
          ))}
        </div>
      </Block>
      <AddCard
        isOpen={isAddModalOpen}
        handleClose={handleClose}
        handleToggle={handleAddToggle}
        updateSection={updateSection}
        sectionId={data.parent_section?._id}
        parentCardId={data.parent_card?._id}
        tags={tags}
      />
      <EditCard
        isOpen={isEditModalOpen}
        handleClose={handleClose}
        handleToggle={handleEditToggle}
        updateSection={updateSection}
        data={currentSection}
      />
    </div>
  );
}
