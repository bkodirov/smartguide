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

  const useCases = data.parent_card?.use_cases;
  const tags = data.parent_card?.tags;
  return (
    <div className="row">
      <Block
        title="UseCases"
        style={{ marginBottom: 16 }}
        action={handleAddToggle}
      >
        <div className="row">
          {useCases?.map((useCase) => (
            <div key={useCase._id} className="col-md-3">
              <UseCaseCard
                title={useCase.title}
                edit={() => handleEditToggle(useCase)}
                useCaseId={useCase._id}
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
