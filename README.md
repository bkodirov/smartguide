# Smartguide app

## ApiDoc
### Import Postman queries: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3a2c1a5467e8616c957f)
### [Web based API doc](https://documenter.getpostman.com/view/11580523/TVzPoKiq)

##Samples
### Section
```
section: {
    title: "123",
    tags: [],
    cards: [ #card ],
}
```

### Card
```
card: {
    parent_card_id: "asdasd",
    section_id: "asdasd",
    title: "123",
    type: "1234",
    tags: [],
    cards: [ #card ],
    use_cases: [ #use_case ]
}
```


### Use Case
```
use_case: {
    parent_card_id: "asdasd",
    title: "1234",
    "tags": [],
    head_node_id: "abcd",
    nodes: [ #node ]
}
```


### Node
```
node = {
    "use_case_id: "1",
    "question": {
        "explanation": "",
        "question_text": "123",
        "tags": [],
        "answers": [
            {
                "text": "123",
                "node_id": "node_id_3""
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

Objects are substituted into IDs in DB.

## Lucidchart
[Editable link](https://lucid.app/lucidchart/invitations/accept/c548bc61-6707-46c1-bb52-afb094478858)
