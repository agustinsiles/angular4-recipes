import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { RecipesService } from "app/recipes/recipes.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input('recipe') recipe;
  answers: string[] = [];

  constructor(private recipesService: RecipesService) { }

  keepCooking() {
    const order = this.recipe.order,
      message = [];
    
    for (let i = 0; i < this.recipe.message.length; i++) {
      const msg = this.recipe.message[i];

      if (this.isQuestionMessage(msg.type)) {
        const fragment = {
          type: 'answer',
          data: this.answers[i],
          identifier: msg.identifier,
          prettyIdentifier: msg.prettyIdentifier
        };

        message.push(fragment);
      }
    }
    this.recipesService.keepCooking({ order, message }).subscribe(
      (response: Response) => this.recipe = response.json(),
      (error: Response) => console.log(error.json()) // TODO: Do something when there's an error.
    );
  }

  isQuestionMessage(type) {
    return type === 'question';
  }
}
