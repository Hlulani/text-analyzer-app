import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyzeService } from '../services/analyze.service';
import { AppComponent } from '../app.component';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AnalyzeService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
    declarations: [AnalyzeService],
    }).compileComponents();
  });

  it(`should use analyse text from service`, () => {
    const analyzeService = fixture.debugElement.injector.get(AnalyzeService);
    fixture.detectChanges();
    expect(analyzeService.analyzeText).toEqual(component.analyzeTextOnline);
  });


  it("should analayze text", () => {
    component.selectedValue = "vowels";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("vowels");
  });
});
