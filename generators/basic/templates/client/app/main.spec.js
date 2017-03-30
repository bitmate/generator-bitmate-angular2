var MainComponent = require('./main');
var ngTest = require('@angular/core/testing');

describe('Main Component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        MainComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render hello world', function () {
    var fixture = ngTest.TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    var hello = fixture.nativeElement;
    expect(hello.querySelector('h1').textContent).toBe('Hello World!');
  });
});
