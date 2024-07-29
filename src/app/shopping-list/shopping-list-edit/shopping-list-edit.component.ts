import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  // @ViewChild('nameInput') nameInputRef;
  // @ViewChild('amountInput') amountInputRef;
 // @Output() ingredientAdded=new EventEmitter<Ingredients>();
@ViewChild('f',{static:false}) slform:NgForm;

 subscription:Subscription
 editMode=false;
editedItemIndex:number;
editedItem:Ingredients;

 constructor(private slService:ShoppingListService){}
 ngOnInit(): void {
   this.subscription=this.slService.startedEditing.subscribe(
    (index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.slService.getIngredient(index)
      this.slform.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    }
   )
 }

 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }

  onSubmit(form:NgForm)
{
// const ingName=this.nameInputRef.nativeElement.value;
// const ingAmount=this.amountInputRef.nativeElement.value;
const value=form.value;
const newIngredient=new Ingredients(value.name,value.amount);
if(this.editMode){
  this.slService.updateIngredient(this.editedItemIndex,newIngredient)
}
else{
  this.slService.addIngredient(newIngredient)
}
this.editMode=false
form.reset()
//this.ingredientAdded.emit(newIngredient);
}

onClear(){
  this.slform.reset();
  this.editMode=false
}
onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex)
  this.onClear()
}
}
