const express = require('express');
const fs = require('fs');
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json());
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.get("/gettodos", function (request, response) {
    let name = request.query.username;
    console.log(name);
    gettodos(name, null, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            response.status(200);
            response.json(data);
        }
    })
})

function gettodos(username, all, callback) {
    fs.readFile("./todo.txt", "utf-8", (err, data) => {
        if (err) {
            callback(err);
        } else {
            if (data.length === 0) {
                data ="[]";
            }
            try {
                console.log(data);
                let todos = JSON.parse(data)
                if (all) {
                    callback(null, todos)
                    return
                } else {
                    filtertodos = todos.filter((todo) => {
                        return todo.username === username;
                    })
                    callback(null, filtertodos);
                }

            } catch (error) {
                console.log(error);
            }
        }
    })
}

app.post("/savetodos", (request, response) => {
    console.log(request.body);
    let todo = {
        id: request.body.id,
        todo: request.body.todo,
        status: request.body.status,
        username: request.body.username,
    }
    savetodo(todo, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Todo Saved");
        }
    })
})

function savetodo(ob, callback) {
    gettodos(null, true, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            data.push(ob);
            fs.writeFile("./todo.txt", JSON.stringify(data), "utf-8", (err) => {
                if (err) {
                    console.log("Error While Saving Todo");
                    callback(err);
                } else {
                    console.log("Todo Saved Successfully");
                    callback();
                }
            })
        }
    })
}

app.put("/update")
app.listen(2000, function () {
    console.log("Server Is Running On Port 2000");
});