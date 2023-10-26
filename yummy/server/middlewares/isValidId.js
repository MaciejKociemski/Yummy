import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400);
    throw new Error(`${id} is not a valid id`);
  }

  next();
};

export default isValidId;
