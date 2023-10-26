import { Recipe } from"../models/recipe";

class PopularController {
  async getPopular(req, res) {
    const recipeCounts = {};
    const popularRecipesCount = 4;

    
    const results = await Recipe.aggregate([
      { $unwind: "$favorites" },
      { $group: { _id: "$_id", count: { $sum: 1 } } },
    ]);

    results.forEach(({ _id, count }) => (recipeCounts[_id] = count));

    const sortedRecipes = Object.entries(recipeCounts).sort(
      ([_, count1], [__, count2]) => count2 - count1
    );

    const popularRecipes = await Recipe.find()
      .where("_id")
      .in(
        sortedRecipes
          .slice(0, popularRecipesCount)
          .map(([recipeId]) => recipeId && recipeId.trim())
      )
      .exec();

    res.status(200).json({
      code: 200,
      message: "Received the most popular recipes",
      data: popularRecipes,
    });
  }
}

const popularCtrl = new PopularController();

export default popularCtrl;
