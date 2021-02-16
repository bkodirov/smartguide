const prepareNodes = (useCase) => {
  const unlinkedNodes = [];
  const linkedNodes = new Map();
  const invalidQuestions = new Map();
  const nodeMap = new Map();
  useCase.nodes.forEach((item) => nodeMap.set(item._id, item));

  function findLinked(node) {
    if (!node) return;
    if (!node.conclusion && !node.question) return;
    if (linkedNodes.has(node._id)) return;

    linkedNodes.set(node._id, node);
    if (node.question) {
      linkedNodes.set(node._id, node);
      if (node.question.answers) {
        if (node.question.answers.length === 0){
          invalidQuestions.set(node._id, node);
        }
        node.question.answers.forEach((item) => {
          if (!item.node_id) {
            invalidQuestions.set(node._id, node);
          } else {
            findLinked(nodeMap.get(item.node_id));
          }
        });
      }
    }
  }

  if (useCase.head_node_id) findLinked(nodeMap.get(useCase.head_node_id));
  useCase.nodes.forEach((item) => {
    if (!linkedNodes.has(item._id)) unlinkedNodes.push(item);
  });
  return {unlinkedNodes, linkedNodes, invalidQuestions, nodeMap}
}

export { prepareNodes };