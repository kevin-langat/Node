const Product = require('../Models/Products');

async function analysisOfAProduct(req, res) {
  try {
    const productAnalysis = await Product.aggregate([
      {
        $match: {
          category: req.params.name,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$price',
          },
          avgPrice: {
            $avg: '$price',
          },

          minProductPrice: {
            $min: '$price',
          },

          maxProductPrice: {
            $max: '$price',
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          avgPrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ['$maxProductPrice', '$minProductPrice'],
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'Success',
      data: productAnalysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
      error: error,
    });
  }
}

async function getProductStats(req, res) {
  try {
    const result = await Product.aggregate([
      // stage one
      {
        $match: {
          inStock: true,
          price: {
            $gte: 50,
          },
        },
      },
      // stage 2
      {
        $group: {
          _id: '$category',
          avgPrice: {
            $avg: '$price',
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured',
      error,
    });
  }
}

async function insertSampleProducts(req, res) {
  try {
    const additionalProducts = [
      {
        name: 'Wireless Charging Pad',
        category: 'Electronics',
        price: 28.0,
        inStock: false,
        tags: ['phone', 'tech', 'charger'],
      },
      {
        name: 'Leather Journal',
        category: 'Stationery',
        price: 32.0,
        inStock: true,
        tags: ['writing', 'office', 'handmade'],
      },
    ];

    const result = await Product.insertMany(additionalProducts);
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} products`,
      products: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured',
      error,
    });
  }
}
module.exports = { insertSampleProducts, getProductStats, analysisOfAProduct };
