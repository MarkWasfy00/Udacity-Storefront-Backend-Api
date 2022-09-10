import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const userRules = [
  body("email") // < -- checking email 📏
    .exists()
    .withMessage("are not found")
    .isEmail()
    .withMessage("are not valid"),
  body("name") // < -- checking name 📐
    .exists()
    .withMessage("are not found")
    .isLength({ min: 4, max: 12 })
    .withMessage("must be a between 4 and 12"),
  body("age")
    .exists()
    .withMessage("are not found")
    .isNumeric()
    .withMessage("must be a number")
    .isInt({ min: 10, max: 60 })
    .withMessage("must between 10 and 60"),
  body("password")
    .exists()
    .withMessage("are not found")
    .isLength({ min: 6, max: 15 })
    .withMessage("must be a between 4 and 15"),
];

export const emailPasswordRules = [
  body("email") // < -- checking email 📏
    .exists()
    .withMessage("are not found")
    .isEmail()
    .withMessage("are not valid"),
  body("password")
    .exists()
    .withMessage("are not found")
    .isLength({ min: 6, max: 15 })
    .withMessage("must be a between 4 and 15"),
];

export const idUserRulesOnBody = [
  body("id").exists().withMessage("are not found").isNumeric().withMessage("must be a number"),
];

export const idUserRulesOnParams = [
  param("id").exists().withMessage("are not found").isNumeric().withMessage("must be a number"),
];

// validate the query 📝
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    // gets the first error in the array and displayed in json form 🔀
    const errorMessage = { msg: `${errors.array()[0].param} ${errors.array()[0].msg}`, status: 400 };
    res.status(400).json(errorMessage);
  }
};
