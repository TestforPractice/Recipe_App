import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from '../../recipe.service';
@Component({
  selector: 'app-recipes-items',
  templateUrl: './recipes-items.component.html',
  styleUrl: './recipes-items.component.css'
})
export class RecipesItemsComponent {
  @Input() recipes: Recipe
  @Input() index:number

  // constructor(private recipeservice:RecipeService){}
  // select(){
  //  this.recipeservice.recipeSelected.emit(this.recipes);
  // }
}