import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
ingredients:Ingredients[];
igChangeSub:Subscription;
constructor(private slService:ShoppingListService){}

ngOnInit()
{
  this.ingredients=this.slService.getIngredients();
  this.igChangeSub=this.slService.ingredientsChanged.subscribe(
    (ingredients:Ingredients[])=>{
      this.ingredients=ingredients;
    }
  )
}
ngOnDestroy(): void {
  this.igChangeSub.unsubscribe();
}
// onIngredientAdded(item){
//   this.ingredients.push(item);
// }

onEditItem(index:number){
  this.slService.startedEditing.next(index);
}
}
