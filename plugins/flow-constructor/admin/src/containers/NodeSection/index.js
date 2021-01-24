import React, { useState } from "react";
import FlowDiagram from "../../components/FlowDiagram";
import { AddNode, EditNode } from "../../components/Node";

export default function NodeSection({
  data,
  updateSection,
  setIsAddModalOpen,
  isAddModalOpen,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState({});

  const handleEditToggle = (data) => {
    setIsEditModalOpen(!isEditModalOpen);
    if (data) {
      setCurrentNode(data);
    } else {
      setCurrentNode({});
    }
  };
  const handleClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const tags = data?.tags;
  return (
    <>
      <FlowDiagram />
      <AddNode
        isOpen={isAddModalOpen}
        handleClose={handleClose}
        handleToggle={() => setIsAddModalOpen(!isAddModalOpen)}
        updateSection={updateSection}
        parentNodeId={data.head_node?._id}
        useCaseId={data._id}
        tags={tags}
      />
      <EditNode
        isOpen={isEditModalOpen}
        handleClose={handleClose}
        handleToggle={handleEditToggle}
        updateSection={updateSection}
        data={currentNode}
        parentNodeId={data.head_node?._id}
      />
    </>
  );
}
