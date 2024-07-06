import { check, validationResult } from "express-validator";

export const validateBus = [
  check("busName").notEmpty().withMessage("Bus name is required"),
  check("busNumber").notEmpty().withMessage("Bus number is required"),
  check("busType").notEmpty().withMessage("Bus type is required"),
  check("route.startingStation")
    .notEmpty()
    .withMessage("Starting station is required"),
  check("route.endingStation")
    .notEmpty()
    .withMessage("Ending station is required"),
  check("schedule").isArray({ min: 1 }).withMessage("Schedule is required"),
  check("fare.startingToEnding")
    .isNumeric()
    .withMessage("Starting to ending fare is required and must be a number"),
  check("fare.fareTypes")
    .isArray({ min: 1 })
    .withMessage("At least one fare type is required"),
  check("additionalInfo.contact").notEmpty().withMessage("Contact is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
