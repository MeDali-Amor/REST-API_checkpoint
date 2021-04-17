// Imports
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(bodyParser.json());
//connect to database
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

//server listening
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else console.log(`server listening on port${port}`);
});

// Get
app.get("/users", (req, res) => {
    User.find().exec((err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

// Create
app.post("/user", (req, res) => {
    User.create(req.body, (err, newUser) => {
        if (err) res.send(err);
        else res.send(newUser);
    });
});

//Update
app.put("/user/:id", (req, res) =>
    User.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                gender: req.body.gender,
                age: req.body.age,
                email: req.body.email,
            },
        },
        (err, data) => {
            if (err) res.send(err);
            else res.send(data);
        }
    )
);
//DElete
app.delete("/user/:id", (req, res) =>
    User.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    })
);
