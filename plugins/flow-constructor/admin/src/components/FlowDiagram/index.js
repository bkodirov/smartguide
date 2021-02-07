import React from "react";
import * as go from "gojs";
import {ReactDiagram} from "gojs-react";
import "./style.css";

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
    // TODO Doniyor, use data.key as a Node id you want fetch. nodeMap.get(data.key) should return the Node
    console.log(data); //Successfully logs the node you clicked.
    console.log(ev.parameter); //Successfully logs the node's name.
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("key", "key"),
    $(
      go.Shape,
      "RoundedRectangle",
      {name: "SHAPE", fill: "white", strokeWidth: 0},
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      {margin: 8, editable: false}, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );
  // define a TreeLayout that flows from top to bottom

  return diagram;
}

function handleModelChange(changes) {
  console.log("GoJS model changed!");
}

export default function FlowDiagram({data}) {
  const unlinkedNodes = [];
  const linkedNodes = new Map();
  const invalidQuestions = new Map();
  const nodeMap = new Map();
  data.nodes.forEach(item => nodeMap.set(item._id, item));

  function findLinked(node) {
    if (!node) return
    if (!node.conclusion && !node.question) return
    if (linkedNodes.has(node._id)) return

    linkedNodes.set(node._id, node)
    if (node.question) {
      linkedNodes.set(node._id, node)
      if (node.question.answers) {
        if (node.question.answers.length === 0) invalidQuestions.set(node._id, node)
        node.question.answers.forEach(item => {
          if (!item.node_id) {
            invalidQuestions.set(node._id, node)
          } else {
            findLinked(nodeMap.get(item.node_id))
          }
        });
      }
    }
  }

  if (data.head_node_id) findLinked(nodeMap.get(data.head_node_id))
  data.nodes.forEach(item => {
    if (!linkedNodes.has(item._id)) unlinkedNodes.push(item)
  });

  const createData = (node) => ({
    key: node._id,
    text: node.question ? node.question.question_text : node.conclusion.text,
    color: invalidQuestions.has(node._id) ? 'red' : 'lightblue',
  })
  const linkedNodesArr = []
  if (data.head_node_id) linkedNodesArr.push(createData(nodeMap.get(data.head_node_id)))
  linkedNodes.forEach((node) => {
      if (node.question && node.question.answers) {
        linkedNodesArr.push(
          ...node.question.answers
            .filter(answer => answer.node_id !== undefined)
            .map(answer => {
              const treeData = createData(nodeMap.get(answer.node_id))
              treeData.parent = node._id
              return treeData
            })
        )
      }
    }
  )

  return (
    <div>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={linkedNodesArr}
        onModelChange={handleModelChange}
      />
    </div>
  );
}
