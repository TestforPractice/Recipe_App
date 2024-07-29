import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{
  selectedrecipe:Recipe;
recipeitem(data){
this.selectedrecipe=data;
}
// constructor(private recipeservice:RecipeService){}
ngOnInit(){
// this.recipeservice.recipeSelected.subscribe(
//   (recipe:Recipe)=>{this.selectedrecipe=recipe}
// );
}
}
