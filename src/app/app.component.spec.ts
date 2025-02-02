import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('shold be 3', ()=>{
    // A = Arrange
    const num1 = 1;
    const num2 = 2;
    // A = Act
    const resultado = num1 + num2;
    //A = Assert
    expect(resultado).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull;
  });

  it('should render router-outlet wrapped with css clases', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    expect(divElement).not.toBeNull();
    const divClasses = divElement?.classList.value.split(' ');

    // Manera para evaluar clases especificas en el elemento HTML sin importar que tenga otras.
    mustHaveClasses.forEach( className => {
      expect(divClasses).toContain(className);
    });

    // Manera para evaluar que el elemento tenga clases especificas, si se le agrega otra, no pasa la prueba.
    /* divElement?.classList.forEach((className)=>{
      expect(mustHaveClasses).toContain(className);
    }); */

  });

  it('should contain the "buy me a beer" link', ()=>{
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).not.toBeNull();
    const titleAnchorAttribute = anchorElement?.title;
    const hrefAttribute = anchorElement?.getAttribute('href');
    expect(titleAnchorAttribute).toBe('Buy me a beer');
    expect(hrefAttribute).toBe('https://www.buymeacoffee.com/scottwindon');
  });
});
