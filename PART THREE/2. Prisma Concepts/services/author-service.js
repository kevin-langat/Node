const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function createNewAuthor(name) {
  try {
    const newlyCreateAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    return newlyCreateAuthor;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}

async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id },
      include: { books: true },
    });

    return deletedAuthor;
  } catch (error) {
    console.log(err.message);
    return err;
  }
}
module.exports = { createNewAuthor, deleteAuthor };
