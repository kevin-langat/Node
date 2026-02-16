const express = require('express');
const { asyncHandler } = require('../middleware/error-handler');

const itemsRoutes = express.Router();

const items = [
  {
    id: 1,
    name: 'Oppo A17K',
  },
  {
    id: 2,
    name: 'Sony Xperia',
  },
  {
    id: 3,
    name: 'Samsung A54',
  },
];

itemsRoutes.get(
  '/items',
  asyncHandler(async (req, res) => {
    res.json(items);
  }),
);

module.exports = itemsRoutes;
