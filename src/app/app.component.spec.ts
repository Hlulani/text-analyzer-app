import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { AnalyzeService } from './services/analyze.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

fdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatFormFieldModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'text-analyzer-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('text-analyzer-app');
  });

  describe('analyzeTextOffline', () => {
    describe('when activeAnalyzer is set to vowels', () => {
      it('should set vowels and vowelsCountMap on the component instance', () => {
        // Assemble / Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        app.activeAnalyzer = 'vowels';
        app.selectedValue = 'Dedalus';
        const expectedVowels = ['e', 'a', 'u'];
        const expectedVowelsCountMap = {
          e: 1,
          a: 1,
          u: 1,
        };

        // Act
        app.analyzeTextOffline();

        // Assert
        expect(app.vowels).toEqual(expectedVowels);
        expect(app.vowelsCountMap).toEqual(expectedVowelsCountMap);
      });
    });

    describe('when activeAnalyzer is set to consonant', () => {
      it('should set consonant and consonantsCountMap on the component instance', () => {
        // Assemble / Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        app.activeAnalyzer = 'consonants';
        app.selectedValue = 'Dedalus';
        const expectedConsonants = ['d', 'l', 's'];
        const expectedConsonantsCountMap = {
          d: 2,
          l: 1,
          s: 1,
        };

        // Act
        app.analyzeTextOffline();

        // Assert
        expect(app.consonants).toEqual(expectedConsonants);
        expect(app.consonantsCountMap).toEqual(expectedConsonantsCountMap);
      });
    });
  });
});

fdescribe('analyzeTextOnline', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatFormFieldModule,
      ],
      declarations: [AppComponent],
      providers: [AnalyzeService]
    }).compileComponents();
  });

  describe('when activeAnalyzer is set to vowels', () => {
    it('should set vowels and vowelsCountMap on the component instance', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const analyzeService = TestBed.get(AnalyzeService);
      const expectedVowelsCountMap = {
        e: 1,
        a: 1,
        u: 1,
      };

      // Assemble / Arrange
      app.activeAnalyzer = 'vowels';
      app.selectedValue = 'Dedalus';
      const expectedVowels = ['e', 'a', 'u'];
      spyOn(analyzeService, 'analyzeText').and.returnValue(of({
        text: 'Dedalus',
        analyze_type: 'vowels',
        frequency_count: expectedVowelsCountMap,
      }));
    
      // Act
      app.analyzeTextOnline();

      // Assert
      expect(app.vowels).toEqual(expectedVowels);
      expect(app.vowelsCountMap).toEqual(expectedVowelsCountMap);
    });
  });

  describe('when activeAnalyzer is set to consonant', () => {
    it('should set consonant and consonantsCountMap on the component instance', () => {
      // Assemble / Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const analyzeService = TestBed.get(AnalyzeService);
      app.activeAnalyzer = 'consonants';
      app.selectedValue = 'Dedalus';
      const expectedConsonants = ['d', 'l', 's'];
      const expectedConsonantsCountMap = {
        d: 2,
        l: 1,
        s: 1,
      };
      spyOn(analyzeService, 'analyzeText').and.returnValue(of({
        text: 'Dedalus',
        analyze_type: 'consonants',
        frequency_count: expectedConsonantsCountMap,
      }));

      // Act
      app.analyzeTextOnline();

      // Assert
      expect(app.consonants).toEqual(expectedConsonants);
      expect(app.consonantsCountMap).toEqual(expectedConsonantsCountMap);
    });
  });
});
