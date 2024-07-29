import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";
import { exhaustMap, map,take,tap} from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{

constructor(private http:HttpClient, private recipeservice:RecipeService, private authService:AuthService){}
 
storeRecipes(){
 const recipes=this.recipeservice.getRecipes();
 this.http.put('https://ng-course-recipe-book-c51cb-default-rtdb.firebaseio.com/recipes.json', recipes)
 .subscribe(response=>{
    console.log(response);
 });
}

fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-c51cb-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes=>{
        return recipes.map(recipe=>{
            return {...recipe,Ingredient: recipe.Ingredient? recipe.Ingredient:[]}
        });
    }),
        tap(recipies=>{
                    this.recipeservice.setRecipes(recipies)
        })
    );//take(1) will take one instance and then unsubscribe the observable, exhausmap is used to replace with new observable
   
}
}