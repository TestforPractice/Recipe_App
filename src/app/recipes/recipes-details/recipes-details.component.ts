import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent implements OnInit {
//  @Input() recipe:Recipe
recipe:Recipe
id:number
 constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router){}
 onAddToShoppingList(){
  this.recipeService.addIngredientToShoppingList(this.recipe.Ingredient);
 }
 ngOnInit(){
  // const id=this.route.snapshot.params['id']
  this.route.params.subscribe(
    (params:Params)=>{
      this.id=+params['id'];
      this.recipe=this.recipeService.getRecipe(this.id);
    }
  )
 }
 onEditRecipe(){
//  this.router.navigate(['edit'],{relativeTo:this.route})
this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
 }

 onDeleteRecipe()
{
this.recipeService.deleteRecipe(this.id);
this.router.navigate(['/recipes'])
}
}
