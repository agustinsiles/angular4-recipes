import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesService, MockBackend, BaseRequestOptions, {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        }
      }]
    });
  });

  beforeEach(inject([RecipesService, MockBackend], (recipesService: RecipesService, mockBackend: MockBackend) => {
   service = recipesService;
   backend = mockBackend;
  }));

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should call getRecipes() and get the response', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify([{ recipeId: 'test1', description: 'test' }])
      });
      connection.mockRespond(new Response(options));
    });

    service.getRecipes().subscribe((response) => {
      expect(response.json()).toEqual([{ recipeId: 'test1', description: 'test' }]);
      done();
    });
  });

  it('should call startCooking() and get the response', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify([{ message: [], order: [] }])
      });
      connection.mockRespond(new Response(options));
    });

    service.startCooking('test1').subscribe((response) => {
      expect(response.json()).toEqual([{ message: [], order: [] }]);
      done();
    });
  });

  it('should call keepCooking() and get the response', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify([{ message: [], order: [] }])
      });
      connection.mockRespond(new Response(options));
    });

    service.keepCooking({ }).subscribe((response) => {
      expect(response.json()).toEqual([{ message: [], order: [] }]);
      done();
    });
  });
});