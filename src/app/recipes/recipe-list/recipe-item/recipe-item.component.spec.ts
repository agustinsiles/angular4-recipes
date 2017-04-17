import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { RecipesService } from "app/recipes/recipes.service";

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('initialize component', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
      expect(component.recipe).toEqual({});
    });
  
    it('should have an empty object for recipe by default', () => {
      const compiled = fixture.debugElement.nativeElement;      
      expect(compiled.querySelector('.sid-recipe-item-id').textContent).toBe('');
      expect(compiled.querySelector('.sid-recipe-item-description').textContent).toBe('');
    });
  });

  describe('Recipe Data', () => {
    it('should show recipe ID and recipe description', () => {      
      component.recipe = {
        recipeId: 'test1',
        description: 'recipe description'
      };
      
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      
      expect(compiled.querySelector('.sid-recipe-item-id').textContent).toBe('test1');
      expect(compiled.querySelector('.sid-recipe-item-description').textContent).toBe('recipe description');
    })
  });
});
