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

  getTextAreaVal(e: any) {
    this.selectedValue = e.target.value;
  }

  analyzeTextOnline() {
    this.analyzeService
      .analyzeText(this.activeAnalyzer, this.selectedValue)
      .subscribe(
        (data: any) => {
          console.log(data.frequency_count);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  changeAnalyzer(type: string) {
    this.activeAnalyzer = type;
  }

  analyzeTextOffline(type: string, chars: string) {
    this.vowels = [];
    this.vowelsCountMap = {};
    this.consonants = [];
    this.consonantsCountMap = {};

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (type == 'vowels') {
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i].toLowerCase();

        if (vowels.indexOf(char) != -1) {
          this.vowelsCountMap[char] = this.vowelsCountMap[char]
            ? this.vowelsCountMap[char] + 1
            : 1;
        }
      }
      this.vowels = Object.keys(this.vowelsCountMap);
      console.log(this.vowels);
    } else if (type == 'consonants') {
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i].toLowerCase();

        if (vowels.indexOf(char) == -1 && char != ' ') {
          this.consonantsCountMap[char] = this.consonantsCountMap[char]
            ? this.consonantsCountMap[char] + 1
            : 1;
        }
      }
      this.consonants = Object.keys(this.consonantsCountMap);
    }
  }
}
