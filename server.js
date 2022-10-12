const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

mongoose.connect(
    process.env.MONDGODB_URI || 'mongodb://127.9.9.1:27017/SocialNetwork',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

//use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`connected on localhost: ${PORT}`));