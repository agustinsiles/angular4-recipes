import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class RecipesService {

  constructor(private http: Http) { }

  getRecipes() {
    return this.http.get('http://localhost:3000/recipes');
  }

  startCooking(recipeId) {
    return this.http.get('http://localhost:3000/cook/start/' + recipeId);
  }

  keepCooking(interaction) {
    return this.http.post('http://localhost:3000/cook/continue/', interaction);
  }
}
