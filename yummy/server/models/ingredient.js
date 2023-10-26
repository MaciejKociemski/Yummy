import { model, Schema } from "mongoose";

const ingredientSchema = Schema(
  {
    ttl: {
      type: String,
      required: [true, "db: ttl is required"],
    },
    desc: {
      type: String,
    },
    t: {
      type: String,
    },
    thb: {
      type: String,
      required: [true, "db: tnd is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Ingredient", ingredientSchema);
