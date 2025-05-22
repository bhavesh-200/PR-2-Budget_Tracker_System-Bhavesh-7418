const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/budgetTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const routes = require('./routes/index');
app.use('/', routes);

const PORT = 8001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
