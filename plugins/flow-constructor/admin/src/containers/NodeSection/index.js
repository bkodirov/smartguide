import React from "react";
import FlowDiagram from "../../components/FlowDiagram";
import { AddNode, EditNode, LinkingNode } from "../../components/Node";

export default function NodeSection({ data, updateSection }) {
  const tags = data?.tags;
  return (
    <>
      <AddNode
        updateSection={updateSection}
        useCaseId={data._id}
        nodes={data.nodes}
        parentNodeId={null}
        answerId={null}
        tags={tags}
      />
      <FlowDiagram data={data} />
      <EditNode
        updateSection={updateSection}
        parentNodeId={data.head_node?._id}
      />
      <LinkingNode nodes={data.nodes} />
    </>
  );
}
