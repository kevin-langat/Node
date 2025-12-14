const express = require('express');
const path = require('path');
const app = express();

// set the  view engine
app.set('view engine', 'ejs');

// set the directory for the views
app.set('views', path.join(__dirname, 'views'));

const products = [
  {
    id: 1,
    title: 'Product 1',
  },
  {
    id: 2,
    title: 'Product 2',
  },
  {
    id: 3,
    title: 'Product 3',
  },
];

app.get('/', (req, res) => {
  res.render('Home', { title: 'Home', products: products });
});

app.get('/about', (req, res) => {
  res.render('About', { title: 'About Page' });
});
app.listen(8000, () => {
  console.log('App running on port:8000');
});
