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

app.post('./api/notes', function(req, res) {
    fs.readFile('./db/db.json', function(err, data) {
        console.log(data);
        const addNote = req.body;
        addNote.id = uuidv4();
        const note = JSON.parse(data);
        note.push(addNote);
        fs.writeFile('.db/db.json', JSON.stringify(note), function() {
            res.send(addNote);
        });
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(express.urlencoded({extended: true}));
app.use(expres.json());
app.use(express.static('public'));

app.listen(PORT, function() {
    console.log(`listening on PORT: ${PORT}`);
});

