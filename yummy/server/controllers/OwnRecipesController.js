import { Recipe } from "../models/recipe";
import cloudinary from "cloudinary";

class OwnRecipesController {
  // Add ownRecipe
  async addRecipe(req, res) {
    const { title, instructions, description, category, time, ingredients } =
      req.body;
    if (
      !title ||
      !description ||
      !instructions ||
      !category ||
      !time ||
      !ingredients
    ) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }

    const { _id: owner } = req.user;

    if (!req.file) {
      res.status(400);
      throw new Error("Controller: Image require");
    }
    const { path: filePath } = req.file;

    const fileName = req.file.filename;

    const newRecipe = await Recipe.create({
      ...req.body,
      thumb: filePath,
      imageId: fileName,
      owner,
    });

    if (!newRecipe) {
      res.status(500);
      throw new Error("Server Error");
    }
    res.status(201).json({
      code: 201,
      message: "success",
      data: newRecipe,
    });
  }

  // Remove ownRecipe
  async removeRecipe(req, res) {
    const { id: recipeId } = req.params;
    const { _id: userId } = req.user;

    if (!recipeId) {
      res.status(400);
      throw new Error("Controller: recipeId is required");
    }

    if (!userId) {
      res.status(400);
      throw new Error("Controller: user not authorized");
    }

    const result = await Recipe.findOne({ _id: recipeId, owner: userId });

    if (!result) {
      res.status(400);
      throw new Error("Controller: Recipe not found");
    }

    if (result.thumb && result.imageId) {
      const publicId = result.imageId;
      await cloudinary.uploader.destroy(publicId);
    }

    const deletedRecipe = await Recipe.findByIdAndRemove(recipeId, {
      invalidate: true,
      resource_type: "image",
    });

    if (!deletedRecipe) {
      res.status(400);
      throw new Error("Controller: Recipe not found");
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Recipe deleted",
      data: deletedRecipe,
    });
  }

  async getAllOwnRecipes(req, res) {
    const { _id: userId } = req.user;

    const result = await Recipe.find({ owner: userId });

    if (!result) {
      res.status(400);
      throw new Error("Controller: Recipes not found");
    }

    res.json({
      status: "success",
      code: 200,
      message: "Own Recipes",
      data: result,
      quantity: result.length,
    });
  }
}

const ownRecipeCtrl = new OwnRecipesController();

export default ownRecipeCtrl;
