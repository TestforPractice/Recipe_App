import { Ingredients } from "../shared/ingredient.model";
import { Subject } from "rxjs";
export class ShoppingListService{
    ingredientsChanged= new Subject<Ingredients[]>();
    startedEditing=new Subject<number>();
   private ingredients:Ingredients[]=[
        new Ingredients('Apples',5),
        new Ingredients('Potatoes',10),
      ];
      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index:number){
            return this.ingredients[index];
      }
      addIngredient(ingredient:Ingredients){
this.ingredients.push(ingredient);
this.ingredientsChanged.next(this.ingredients.slice());
      }
    
      addIngredientsFormRecipe(Ingredient:Ingredients[]){
//     for (let ingredient of Ingredient){
// this.addIngredient(ingredient);
//     or below method}
this.ingredients.push(...Ingredient);
this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index:number,newIngredient:Ingredients){
            this.ingredients[index]=newIngredient;
            this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index:number){
            this.ingredients.splice(index,1);
            this.ingredientsChanged.next(this.ingredients.slice());
      }
}