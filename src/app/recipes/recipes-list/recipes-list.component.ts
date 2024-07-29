import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit, OnDestroy{
  // @Output() recipeselectedlist=new EventEmitter();
 recipes: Recipe[];
 subscription:Subscription;

// recipeselected(data){
//   this.recipeselectedlist.emit(data);
// }
constructor(private recipeservice: RecipeService, private route:Router, private routes:ActivatedRoute){}
ngOnInit(): void {
  this.subscription=this.recipeservice.recipesChanged
  .subscribe(
    (recipes:Recipe[])=>{
      this.recipes=recipes;
    }
  )
  this.recipes=this.recipeservice.getRecipes();
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
onNewRecipe(){
  this.route.navigate(['new'],{relativeTo:this.routes})
}
}
