const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function addBook(title, publishedDate, authorId) {
  try {
    const newlyCreatedBook = await prisma.book.create({
      data: {
        title,
        publishedDate,
        author: {
          connect: { id: authorId },
        },
      },
      include: { author: true },
    });

    return newlyCreatedBook;
  } catch (err) {
    console.log(err);
  }
}

async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
      orderBy: { id: 'asc' },
    });

    return books;
  } catch (error) {
    throw error;
  }
}
async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    return book;
  } catch (error) {
    throw error;
  }
}
async function updateBook(id, newTitle) {
  try {
    // const book = await prisma.book.findUnique({
    //   where: { id },
    // });
    // if (!book) {
    //   throw new Error(`Cannot get the book of id ${id}`);
    // }
    // const updatedBook = await prisma.book.update({
    //   where: { id },
    //   data: { title: newTitle },
    //   include: {
    //     author: true,
    //   },
    // });

    // using transactions
    const updatedBookUsingTransac = await prisma.$transaction(
      async (prisma) => {
        const book = await prisma.book.findUnique({
          where: { id },
        });
        if (!book) {
          throw new Error(`Cannot get the book of id ${id}`);
        }

        return prisma.book.update({
          where: { id },
          data: {
            title: newTitle,
          },
          include: {
            author: true,
          },
        });
      },
    );

    return updatedBookUsingTransac;
  } catch (error) {
    throw error;
  }
}
async function deleteBook(id) {
  try {
    const book = await prisma.book.delete({
      where: { id },
      include: { author: true },
    });
    if (!book) {
      throw new Error(`Cannot get the book of id ${id}`);
    }
    return book;
  } catch (error) {
    throw error;
  }
}

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };
