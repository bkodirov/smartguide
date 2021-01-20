import React, { useState } from "react";
import { UseCaseCard } from "../../components/Card";
import Block from "../../components/Block";
import { AddUseCase, EditUseCase } from "../../components/UseCase";

export default function UseCaseSection({ data, updateSection }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState({});

  const handleEditToggle = (data) => {
    setIsEditModalOpen(!isEditModalOpen);
    if (data) {
      setCurrentUseCase(data);
    } else {
      setCurrentUseCase({});
    }
  };
  const handleAddToggle = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const handleClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const cards = data.parent_card?.use_cases;
  const tags = data.parent_card?.tags;
  return (
    <div className="row">
      <Block
        title="UseCases"
        description="Configure the Flow Constructor"
        style={{ marginBottom: 16 }}
        action={handleAddToggle}
      >
        <div className="row">
          {cards?.map((card) => (
            <div key={card._id} className="col-md-3">
              <UseCaseCard
                title={card.title}
                edit={() => handleEditToggle(card)}
                cardId={card._id}
              />
            </div>
          ))}
        </div>
      </Block>
      <AddUseCase
        isOpen={isAddModalOpen}
        handleClose={handleClose}
        handleToggle={handleAddToggle}
        updateSection={updateSection}
        parentCardId={data.parent_card?._id}
        tags={tags}
      />
      <EditUseCase
        isOpen={isEditModalOpen}
        handleClose={handleClose}
        handleToggle={handleEditToggle}
        updateSection={updateSection}
        data={currentUseCase}
        parentCardId={data.parent_card?._id}
      />
    </div>
  );
}
