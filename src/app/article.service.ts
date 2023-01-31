import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleContent } from './article-content.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  getContent(id:number):Observable<any>{
    return this.http.get(`http://localhost:3000/posts/`);
  }

  addContent(data:ArticleContent):Observable<any>{
    console.log("addd dataaaa",data)
    return this.http.post(`http://localhost:3000/posts/`,data)
  }

  deleteContent(data:ArticleContent):Observable<any>{
    return this.http.delete(`http://localhost:3000/posts/${data.id}`)
  }

  editContent(data:any):Observable<any>{
    console.log("Got it on server",data)
    return this.http.put(`http://localhost:3000/posts/${data.id}`,data)
  }

  edit(data:any):Observable<any>{
    console.log("Got it on serverrrrr",data)
    return this.http.get(`http://localhost:3000/posts/${data}`,data)
  }
}
