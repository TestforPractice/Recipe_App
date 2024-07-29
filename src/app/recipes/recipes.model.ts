import { Ingredients } from "../shared/ingredient.model";

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public Ingredient:Ingredients[];

constructor(name: string, desc: string, imagePath:string, Ingredient:Ingredients[]){
    this.name= name;
    this.description=desc;
    this.imagePath= imagePath;
    this.Ingredient=Ingredient;
}
}