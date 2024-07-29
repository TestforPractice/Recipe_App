import { Injectable } from "@angular/core";
import { Recipe } from "./recipes.model";
import {ActivatedRouteSnapshot, Resolve, ResolveStart, RouterStateSnapshot}  from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";


@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
      constructor(private datastorage:DataStorageService, private recipies:RecipeService){}
      
      resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.recipies.getRecipes();

        if(recipes.length===0){
         return this.datastorage.fetchRecipes()
        }
        else{
          return recipes
        }
      }
}