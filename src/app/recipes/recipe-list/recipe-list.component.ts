import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { RecipesService } from "app/recipes/recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeSelected: EventEmitter<any> = new EventEmitter();
  @Output() onRecipesRetrieved: EventEmitter<any> = new EventEmitter();

  recipes: any[] = [];
  showError: boolean = false;
  
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.getRecipes().subscribe(
      (response: Response) => {
        this.showError = false;
        this.recipes = response.json();
        this.onRecipesRetrieved.emit(!this.recipes.length);
      },
      () => this.showError = true // TODO: Do something when an error occurs.
    );
  }

  onClicked(recipe) { 
    this.recipesService.startCooking(recipe.recipeId).subscribe(
      (response: Response) => this.onRecipeSelected.emit(response.json()),
      (error: Response) => console.log(error.json()) // TODO: Do something when an error occurs.
    );
  }
}
