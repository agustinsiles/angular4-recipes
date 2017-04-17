
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RecipesService } from './../recipes.service';
import { inject } from "@angular/core/testing";

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let recipesService;
  let spy;
  let mockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListComponent, RecipeItemComponent ],
      providers: [RecipesService, MockBackend, BaseRequestOptions, {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        }
      }]
    }).compileComponents();
  }));


  beforeEach(inject([RecipesService, MockBackend], (recipesService: RecipesService, mockBackend: MockBackend) => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    
    mockBackend = mockBackend;
    recipesService = fixture.debugElement.injector.get(RecipesService);
    spy = spyOn(recipesService, 'getRecipes').and.returnValue(Promise.resolve([{ recipeId: 'test', description: 'description' }]));

    fixture.detectChanges();
  }));

  describe('initialize component', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
      expect(component.showError).toBe(false);
      
    });
  });
});