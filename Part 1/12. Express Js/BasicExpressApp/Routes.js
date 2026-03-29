const express = require('express');
const app = express();

const port = 8000;

// creating a home page route
app.get('/', (req, res) => {
  res.send('Welcome to home page');
});

// creating a route for fetching products
app.get('/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Macbook pro',
    },
    {
      id: 1,
      name: 'Dell Xps',
    },
    {
      id: 1,
      name: 'Hp Pavilion',
    },
  ];

  res.json(products);
});

// getting a specific product using params
app.get('/products/:id', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Macbook pro',
    },
    {
      id: 2,
      name: 'Dell Xps',
    },
    {
      id: 3,
      name: 'Hp Pavilion',
    },
  ];
  const productId = parseInt(req.params.id);
  const findProduct = products.find((product) => product.id === productId);
  if (findProduct) {
    res.status(200).json(findProduct);
  } else {
    res.send('Cannot find the requested product, Does it exist?');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
