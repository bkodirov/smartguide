import React, { useState, useEffect } from "react";
import FlowDiagram from "../../components/FlowDiagram";
import { AddNode, EditNode } from "../../components/Node";
import { useLocation } from "react-router-dom";

export default function NodeSection({
  data,
  updateSection,
  setIsAddModalOpen,
  isAddModalOpen,
}) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
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

  useEffect(() => {
    const nodeId = params.get("node");
    if (nodeId === data.head_node?._id) {
      handleEditToggle(data.head_node);
    }
  }, [location, data]);

  const tags = data?.tags;
  return (
    <>
      <FlowDiagram />
      <AddNode
        isOpen={isAddModalOpen}
        handleClose={handleClose}
        handleToggle={() => setIsAddModalOpen(!isAddModalOpen)}
        updateSection={updateSection}
        useCaseId={data._id}
        nodes={data.nodes}
        tags={tags}
      />
      {/* <EditNode
        isOpen={isEditModalOpen}
        handleClose={handleClose}
        handleToggle={handleEditToggle}
        updateSection={updateSection}
        data={currentNode}
        parentNodeId={data.head_node?._id}
      /> */}
    </>
  );
}
