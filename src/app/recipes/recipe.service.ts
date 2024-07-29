import { EventEmitter, Injectable } from "@angular/core"
import { Recipe } from "./recipes.model"
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
// recipeSelected=new EventEmitter<Recipe>();
   recipesChanged=new Subject<Recipe[]>();


  //  private recipes: Recipe[]=[
  //       new Recipe("South Indian recipes",
  //       "South Thali", 
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpKRwG0n_E6oD4kWRPvhoLTQwKh98KAArQA&s",
  //     [
  //        new Ingredients('Rice',1),
  //        new Ingredients('Chicken',1)
  //     ]),
  //      new Recipe("North Indian recipes",
  //      "North Thali", 
  //      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjOlvx4vfJNcAYDX1bhjr1q-2ly3xAiGR6Q&s",
  //     [
  //        new Ingredients('Wheat',1),
  //        new Ingredients('Panner',10)
  //     ])
  //      ]
  private recipes:Recipe[]=[];
constructor(private slService:ShoppingListService){}

       getRecipes(){
        return this.recipes.slice()//copy of recipe will be retuned on using slice
       }

       getRecipe(index:number){
         return this.recipes.slice()[index]//to get single recipe
       }

       setRecipes(recipes: Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
       }//over write existing array of recipies

       addIngredientToShoppingList(Ingredient:Ingredients[]){
this.slService.addIngredientsFormRecipe(Ingredient);
       }

       addRecipe(recipe:Recipe){
           this.recipes.push(recipe);
           this.recipesChanged.next(this.recipes.slice())
       }
       updateRecipe(index:number, newRecipe:Recipe){
            this.recipes[index]=newRecipe;
            this.recipesChanged.next(this.recipes.slice())
       }

       deleteRecipe(index:number){
         this.recipes.splice(index,1);
         this.recipesChanged.next(this.recipes.slice());
       }
      }