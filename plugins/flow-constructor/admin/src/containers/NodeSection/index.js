import React, { useState } from "react";
import FlowDiagram from "../../components/FlowDiagram";
import { AddNode, EditNode } from "../../components/Node";

export default function NodeSection({
  data,
  updateSection,
  handleAddToggle,
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
    handleAddToggle();
    setIsEditModalOpen(false);
  };

  const tags = data?.tags;
  return (
    <div className="row">
      <FlowDiagram />
      <AddNode
        isOpen={isAddModalOpen}
        handleClose={handleClose}
        handleToggle={handleAddToggle}
        updateSection={updateSection}
        parentNodeId={data.head_node?._id}
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
    </div>
  );
}
