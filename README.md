# kanban-server
API untuk managing task, yang akan di hit oleh kanban client



## RESTful endpoints


-----
# POST /register

Request Header
Not needed

Request Body
```
  {
    "email": <input email>,
    "password": "<input password>",
  }
```

Response(201-ok)
```
  {
    "id": <auto generate by database>,
    "email": "<email resgistered>",
  }
```

Response(400-Bad Request)
```
{
  "message": "Validation Error"
}
```




# POST /login

Request Header
Not Needed

Request Body
```
  {
    "email": <input email>,
    "password": "<input password>",
  }
```

Response(200-ok)
```
  {
    "id": <user id>,
    "email": "<user email>",
    "access_token": "<user access token>"
  }
```

Response(400-Bad Request)
```
{
  "message": "Validation Error"
}
```

Response(401-Unauthorized)
```
{
  "message": "Invalid Email or Password"
}
```




# POST /loginGoogle

Request Header
Not Needed

Request Body
```
{
  "googleToken": "<googleToken>"
}
```

Response(200-ok)
```
  {
    "id": <user id>,
    "email": "<user email>",
    "access_token": "<user access token>"
  }
```




# GET /category

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not Needed

Response(200-ok)
```
[
    {
        "id": 1,
        "name": "backlog",
        "createdAt": "<time created>",
        "updatedAt": "<time updated>"
    },
    {
        "id": 2,
        "name": "todo",
        "createdAt": "<time created>",
        "updatedAt": "<time updated>"
    },
    {
        "id": 3,
        "name": "doing",
        "createdAt": "<time created>",
        "updatedAt": "<time updated>"
    },
    {
        "id": 4,
        "name": "done",
        "createdAt": "<time created>",
        "updatedAt": "<time updated>"
    }
]
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```



-----
# GET /tasks

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not Needed


Response(201-created) 
below structure one index example of array result
```
[
    {
        "id": "<category id>",
        "name": "<category name>",
        "createdAt": "<time created>",
        "updatedAt": "<time updated>"
        "Tasks": [
            {
                "id": "<task id>",
                "title": "<task title>",
                "UserId": "<user id>",
                "CategoryId": "<category id>",
                "due_date": "<task due date>",
                "createdAt": "<time created>",
                "updatedAt": "<time updated>"
                "User": {
                    "id": "<user id>",
                    "email": "<user email>",
                    "password": "<hashed password>",
                    "createdAt": "<time created>",
                    "updatedAt": "<time updated>"
                }
            },.....
        ].....
    }
]

```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```



-----
# POST /tasks

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  "title": "<input task title>",
  "CategoryId": "<input category id>", (autogenerate based from input position)
  "due_date": "<input task due date>"
}
```
Request Params
Not needed

Response(200-ok)
```
{
  "title": "<task title>",
  "UserId": "<user id>", 
  "CategoryId": "<category id>", 
  "due_date": "<task due date>", 
}
```

Response(400-Bad Request)
```
{
  "message": "Validation Error"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




-----
# GET /tasks/:id

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not needed

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "id": "<task id>",
    "title": "<title task>",
    "UserId": "<user id>",
    "CategoryId": "<category id>",
    "due_date": "<task due date>",
    "createdAt": "<time created>",
    "updatedAt": "<time updated>"
}
```

Response(400-Bad Request)
```
{
  "message": "Validation Error"
}
```
Response(401-Authorization Error)
```
{
  "message": "Authorization Error"
}
```

Response(404-Error Not Found)
```
{
  "message": "Error Not Found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




-----
# PUT /tasks/:id

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  title : "<input edit title>",
  CategoryId : "<input edit title>", (autogenerate based from input position)
  due_date : "<input due date>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "id": "<task id>",
    "title": "<title task>",
    "UserId": "<user id>",
    "CategoryId": "<category id>",
    "due_date": "<task due date>",
    "createdAt": "<time created>",
    "updatedAt": "<time updated>"
}
  ```

Response(400-Bad Request)
```
{
  "message": "Validation Error"
}
```
Response(401-Authorization Error)
```
{
  "message": "Authorization Error"
}
```

Response(404-Error Not Found)
```{
  "message": "Error Not Found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```


-----
# PATCH /tasks/:id

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  CategoryId : "<input edit title>", (autogenerate based from input position)
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "id": "<task id>",
    "title": "<title task>",
    "UserId": "<user id>",
    "CategoryId": "<category id>",
    "due_date": "<task due date>",
    "createdAt": "<time created>",
    "updatedAt": "<time updated>"
}
  ```

Response(400-Bad Request)
```
{
  "message": "Validation Error"
}
```
Response(401-Authorization Error)
```
{
  "message": "Authorization Error"
}
```

Response(404-Error Not Found)
```{
  "message": "Error Not Found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```


-----
# DELETE /tasks/:id

Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
  {
    "message": "Task Deletion Success"
  }
  ```
Response(401-Authorization Error)
```
{
  "message": "Authorization Error"
}
```

Response(404-Error Not Found)
```
{
  "message": "Error Not Found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```

