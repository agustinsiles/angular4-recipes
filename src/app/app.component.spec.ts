import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

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

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have an empty list', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.isListEmpty).toBe(false);
  }));

  it('should show empty list message and hide component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.sid-recipe-list-component').length).toBe(0);
    expect(compiled.querySelector('.sid-recipe-list-empty-msg').length).toBe(1);
  }));

  it('should set isListEmpty since there is a selected recipe', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
  
    app.selectedRecipe = setUpRecipe(false);
    fixture.detectChanges();

    expect(app.isListEmpty).toBe(false);
  }));

  it('should show details component since there is a selected recipe', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
  
    app.selectedRecipe = setUpRecipe(false);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.sid-recipe-details-component').length).toBe(1);
  }));
});
