# Strapi application

A quick description of your strapi application

##Section
```
card: {
    id: 1,
    title: "",
    tags: [""],
    cards: [ card_id_1, card_id_2 ],
}
```

##Card
```
card: {
    id: 1,
    parent_card_id: "",
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
    head_node_id: node_id,
    parent_card_id: "",
}
```


##Node
```
{
    "id": "1",
    "parent_node_id": "507f191e810c19729de860ea",
    "question": {
        "explanation": "",
        "question_text": "123",
        "tags": [],
        "answers": [
            {
                "text": "123",
                "node_id": "507f191e810c19729de860ea"
            }
        ]
    },
    "conclusion": {
        "text": "123",
        "links": [ 
            {
                "text": "123",
                "link": "http://google.com"
            }
        ],
        "tags": [ ]
    }
}
```
