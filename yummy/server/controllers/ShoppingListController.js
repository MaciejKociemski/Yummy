import { User } from "../models/user";

class ShoppingListController {
  async addToShoppingList(req, res) {
    const { _id: userId } = req.user;
    const { _id, measure } = req.body;
    const ingredient = { _id, measure };

    if (!_id || !measure) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { $push: { shoppingList: ingredient } },
      { new: true }
    );

    if (!result) {
      res.status(400);
      throw new Error("Bad Request");
    }

    res.status(200).json({
      code: 200,
      message: "success",
      data: result.shoppingList,
    });
  }

  async deleteShopping(req, res) {
    const { _id: userId } = req.user;
    const { _id: ingredientId, measure: ingredientMeasure } = req.body;

    if (!ingredientId || !ingredientMeasure) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }

    const ingredient = await User.findOne(
      {
        _id: userId,
        shoppingList: {
          $elemMatch: { _id: ingredientId, measure: ingredientMeasure },
        },
      },
      {
        shoppingList: {
          $elemMatch: { _id: ingredientId, measure: ingredientMeasure },
        },
      }
    );

    if (!ingredient) {
      return res.status(404).json({
        code: 404,
        message: "Ingredient not found in shopping list",
        data: [],
      });
    }

    const result = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          shoppingList: { _id: ingredientId, measure: ingredientMeasure },
        },
      },
      { new: true }
    );

    res.status(200).json({
      code: 200,
      message: "success",
      data: result.shoppingList,
    });
  }

  async getShopping(req, res) {
    const { _id: userId } = req.user;

    const result = await User.findById(userId)
      .populate({
        path: "shoppingList._id",
        model: "Ingredient",
      })
      .select("shoppingList");

    if (!result) {
      res.status(404);
      throw new Error(`User not found`);
    }

    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
    });
  }
}

const shoppingCtrl = new ShoppingListController();

export default shoppingCtrl;
