export const generateID = (books) => {
  if (books.length === 0) return 1;
  return Math.max(...books.map((book) => book.bookID)) + 1;
};
