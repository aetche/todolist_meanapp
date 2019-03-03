const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/coderlist');

const todos = require('./routes/todos');

app.use('/', todos);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
