import React, {useState} from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./style.css";
import {EditNode} from "../Node";
import {prepareNodes} from "../Node/utils";

function handleModelChange(changes) {
  console.log("GoJS model changed!");
}

export default function FlowDiagram({ data: useCase, updateSection }) {
  const [editingNode, updateEditingNode] = useState();

  const {unlinkedNodes, linkedNodes, invalidQuestions, nodeMap} = prepareNodes(useCase)

  const createData = (node) => ({
    key: node._id,
    text: node.question ? node.question.question_text : node.conclusion.text,
    color: invalidQuestions.has(node._id) ? "red"   // If the node has invalid end
      : node.conclusion ? 'green' // Leaf node
        : !linkedNodes.has(node._id) ? 'lightyellow' // Should be connected
          : "lightblue", // Ordinary node
  });
  const nodeArray = [];
  // Adding Linked nodes
  if (useCase.head_node_id) nodeArray.push(createData(nodeMap.get(useCase.head_node_id)));
  linkedNodes.forEach((node) => {
    if (node.question && node.question.answers) {
      nodeArray.push(
        ...node.question.answers
          .filter((answer) => answer.node_id)
          .map((answer) => {
            const treeData = createData(nodeMap.get(answer.node_id));
            treeData.parent = node._id;
            return treeData;
          })
      );
    }
  });
  // Adding unlinked nodes
  nodeArray.push(...unlinkedNodes.map(item=> createData(item)))

  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": false, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      "clickCreatingTool.archetypeNodeData": {
        text: "new node",
        color: "lightblue",
      },
      model: $(go.TreeModel),
      layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
    });

    diagram.addDiagramListener("ObjectDoubleClicked", function (ev) {
      let data = ev.subject.og.lb;
      console.log(data); //Successfully logs the node you clicked.
      console.log(ev.parameter); //Successfully logs the node's name.
      updateEditingNode(nodeMap.get(data.key))
    });

    // define a simple Node template
    diagram.nodeTemplate = $(
      go.Node,
      "Auto", // the Shape will go around the TextBlock
      new go.Binding("key", "key"),
      $(
        go.Shape,
        "RoundedRectangle",
        { name: "SHAPE", fill: "white", strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: false }, // some room around the text
        new go.Binding("text").makeTwoWay()
      )
    );
    return diagram;
  }

  return (
    <div>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={nodeArray}
        onModelChange={handleModelChange}
      />
      {
        editingNode !== undefined && <EditNode
          updateSection={updateSection}
          useCase={useCase}
          node={editingNode}
          handleClose={() => updateEditingNode()}
        />
      }
    </div>
  );
}
