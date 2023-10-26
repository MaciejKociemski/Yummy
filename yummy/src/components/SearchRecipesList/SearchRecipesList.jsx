import { RecipesList } from "../RecipesList/RecipesList";

export const SearchedRecipesList = ({ searchList }) => {
  return (
    <div>
      <RecipesList list={searchList} />
    </div>
  );
};
