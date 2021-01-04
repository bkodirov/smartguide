# Strapi application

A quick description of your strapi application
##Card
```
card: {
    id: 1,
    title: "",
    type: '',
    tags: [""],
    cards: [ card_id_1, card_id_2 ],
    use_cases: [cae_id_1, case_id_2 ]
}
```


##Use Case
```
case: {
    id: 1,
    title: "",
    head_node_id: node_id 
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
