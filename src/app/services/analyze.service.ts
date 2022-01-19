import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnalyzeService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/analyze';

  //service to analyse text
  analyzeText(type: String, selected_text: String) {
    console.log(type, selected_text);
    return this.http.post(this.url, {
      analyze_type: type,
      text: selected_text,
    });
  }
}
