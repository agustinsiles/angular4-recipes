import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsComponent } from './recipe-details.component';
import { RecipesService } from "app/recipes/recipes.service";

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setUpRecipe(isFinished) {
    return {
      order: {
        finished: isFinished,
        recipeId: 'test1'
      },
      message: [{
        type: 'question',
        prettyIdentifier: 'Firstname'
      }, {
        type: 'data',
        prettyIdentifier: 'Some message'
      }]
    };
  }

  describe('initialize component', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
      expect(component.answers).toEqual([]);
      expect(component.recipe).toEqual({});
    });
    
    it('should have an empty object for recipe by default', () => {
      const compiled = fixture.debugElement.nativeElement;      
      expect(compiled.querySelector('.sid-recipe-details-title').textContent).toBe('');
    });
  });

  describe('Continue button and finished message', () => {
    it('should enable continue button since it is not the last step and answer is provided', () => {
      component.recipe = setUpRecipe(false);
      component.answers[0] = "My answer";
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.sid-recipe-details-btn').enabled).toBe(true);
      expect(compiled.querySelector('.sid-recipe-details-finished-msg').length).toBe(0);
    });

    it('should not show enabled continue button if it is the last step', () => {
      component.recipe = setUpRecipe(true);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.sid-recipe-details-btn').enabled).toBe(false);
      expect(compiled.querySelector('.sid-recipe-details-finished-msg').length).toBe(1);
    });

    it('should not enable continue button if answer is not provided', () => {
      component.recipe = setUpRecipe(false);
      component.answers[0] = undefined;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.sid-recipe-details-btn').enabled).toBe(false);
    });   
  });
  
  describe('Recipe Data', () => {
    it('should show recipe id', () => {      
      component.recipe = setUpRecipe(false);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.sid-recipe-details-title').textContent).toBe('test1');
    });

    it('should show one question and one message (in that order)', () => {
      component.recipe = setUpRecipe(false);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.sid-recipe-details-answer-0').length).toBe(1);
      expect(compiled.querySelector('.sid-recipe-details-answer-1').length).toBe(0);

      expect(compiled.querySelector('.sid-recipe-details-msg-0').length).toBe(0);
      expect(compiled.querySelector('.sid-recipe-details-msg-1').length).toBe(1);
    });
  });

  describe('isQuestionMessage()', () => {
    it('should return true since a question is passed', () => {
      component.recipe = setUpRecipe(false);
  
      fixture.detectChanges();

      expect(component.isQuestionMessage(component.recipe.message[0])).toBe(true);
    });

    it('should return false since a message is passed', () => {
      component.recipe = setUpRecipe(false);
  
      fixture.detectChanges();

      expect(component.isQuestionMessage(component.recipe.message[1])).toBe(false);
    });
  });
});
