const Product = require('../models/Product');

const resolvers = {
  Query: {
    products: async () => Product.find({}),
    product: async (_, { id }) => {
      return Product.findById(id);
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      const newlyCreatedProduct = new Product(args);

      return await newlyCreatedProduct.save();
    },

    updateProduct: async (_, { id, ...args }) => {
      return await Product.findByIdAndUpdate(id, args, { new: true });
    },
    deleteProduct: async (_, { id }) => {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return !!deletedProduct;
    },
  },
};
module.exports = resolvers;
