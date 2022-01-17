import { Component } from '@angular/core';

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
  displayVal = '';
  visibilityVowels = false;
  visibility = false;
  getValuesToAnalyze1(value: string) {
    console.warn(value);
    this.displayVal = value;
  }

  getValuesToAnalyze(type: string, chars: string) {
    console.log('called');
    this.vowels = [];
    this.vowelsCountMap = {};
    this.consonants = [];
    this.consonantsCountMap = {};

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (type == 'vowels') {
      this.visibilityVowels = true;
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
      this.visibility = true;
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
