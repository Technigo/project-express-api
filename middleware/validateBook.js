import { body, validationResult } from "express-validator";

export const validateBook = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("authors").isString().notEmpty().withMessage("Authors are required"),
  body("average_rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Average rating must be between 0 and 5"),
  body("isbn").isInt().withMessage("ISBN must be an integer"),
  body("isbn13").isInt().withMessage("ISBN13 must be an integer"),
  body("language_code")
    .isString()
    .notEmpty()
    .withMessage("Language code is required"),
  body("num_pages")
    .isInt({ min: 1 })
    .withMessage("Number of pages must be at least 1"),
  body("ratings_count")
    .isInt({ min: 0 })
    .withMessage("Ratings count must be a non-negative integer"),
  body("text_reviews_count")
    .isInt({ min: 0 })
    .withMessage("Text reviews count must be a non-negative integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
