# Smartguide app

##ApiDoc
### Import Postman queries: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3a2c1a5467e8616c957f)
### [Web based API doc](https://documenter.getpostman.com/view/11580523/TVzPoKiq)

##Samples
###Section
```
section: {
    id: "any",
    title: "123",
    type: "somethins",
    tags: [],
    cards: [ #card ],
}
```

###Card
```
card: {
    id: "1",
    title: "123",
    type: "1234",
    tags: [],
    cards: [ #card ],
    use_cases: [ #use_case ]
}
```


###Use Case
```
use_case: {
    id: "1",
    title: "1234",
    head_node: #node,
}
```


###Node
```
node = {
    "id": "1",
    "parent_node_id": #node |'root' ,
    "question": {
        "explanation": "",
        "question_text": "123",
        "tags": [],
        "answers": [
            {
                "text": "123",
                "node": #node"
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
