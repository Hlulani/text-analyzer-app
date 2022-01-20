import { Component } from '@angular/core';
import { AnalyzeService } from './services/analyze.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'text-analyzer-app';
  vowels: any = [];
  vowelsCountMap: any = {};
  consonants: any = [];
  consonantsCountMap: any = {};

  activeAnalyzer = '';
  selectedValue = '';

  constructor(private analyzeService: AnalyzeService) {}

  analyzeTextOnline() {
    this.analyzeService
      .analyzeText(this.activeAnalyzer, this.selectedValue)
      .subscribe(
        (data: any) => {
          console.log(data.frequency_count);
          this.vowelsCountMap = data.frequency_count;
          this.vowels = Object.keys(this.vowelsCountMap);
          
          this.consonantsCountMap = data.frequency_count;
          this.consonants = Object.keys(this.consonantsCountMap);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  changeAnalyzer(type: string) {
    this.activeAnalyzer = type;
  }

  analyzeTextOffline() {
    this.vowels = [];
    this.vowelsCountMap = {};
    this.consonants = [];
    this.consonantsCountMap = {};
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const isTypeVowels = this.activeAnalyzer === 'vowels';
    const characterTypeMap = this.selectedValue.toLowerCase()
      .split('')
      .filter(char => vowels.includes(char) === isTypeVowels)
      .reduce((charCountMap: any, character) => {
        if (charCountMap[character]) {
          charCountMap[character] = charCountMap[character] + 1;
        } else {
          charCountMap[character] = 1;
        }
        return charCountMap;
      }, {});

    if (isTypeVowels) {
      this.vowelsCountMap = { ...characterTypeMap };
      this.vowels = Object.keys(this.vowelsCountMap);
    } else {
      this.consonantsCountMap = { ...characterTypeMap };
      this.consonants = Object.keys(this.consonantsCountMap);
    }
  }
}
