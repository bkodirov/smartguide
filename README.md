# Strapi application

A quick description of your strapi application
##Card
```
card: {
    id: 1,
    title: "",
    tags: [""],
    cards: [ card_id_1, card_id_2 ],
    nodes: [node_id_1, node_id_2 ]
}
```

##Node
```
node: {
    id: 1,
    question: {
        explanation: "",
        question_text: "",
        tags: [""],
        answers: [
            {
                text: "",
                nodeId: 99
            },
        ]
    },
    conclusion: {
        text: "",
        links: [ "" ],
        tags: [ "" ]
    }
}
```
