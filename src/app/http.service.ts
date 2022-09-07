import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'http://localhost:3000/api/';
  imageBaseUrl = 'http://localhost:3000/images/logo/';

  constructor(private http: HttpClient) {}

  fetchAllQuestions() {
    return this.http.get(`${this.baseUrl}getQuestions`);
  }
  postQuestion(body: any) {
    return this.http.post(`${this.baseUrl}question/addQuestion`, body);
  }
  answerQuestion(body: any) {
    return this.http.post(`${this.baseUrl}answer/addAnswer`, body);
  }
  getSingleQuestion(id: any) {
    return this.http.get(`${this.baseUrl}question/getQuestion?id=${id}`);
  }
}
