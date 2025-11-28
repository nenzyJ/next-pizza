import { Ingredient } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

type IngredientItem = Pick<Ingredient, "id" | "name">;

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([]);
  const [loading, setLoading] = React.useState(true)

  

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredients) => ({
            id: ingredients.id,
            name: ingredients.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients();
  }, []);
  return { ingredients, loading };
};
