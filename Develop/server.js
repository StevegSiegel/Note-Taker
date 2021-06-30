const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

// routes

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('./db/db.json', function(err, data) {
    fs.readFile('./db/db.json', function(err, data) {
        console.log(data);
        res.send(data);
    });
});

