import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from '../Models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  public result: any;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5000/api/Library';
   }
  public url : string;

  getAuthors(): Observable<any> {

    return this.http.get(this.url+'/listAuthors');
  }


  saveAuthors(author: Author) {
  
    return this.http.post<any>(this.url+'/saveAuthor', author);
  }

  editAuthors(author: Author) {
  
    return this.http.put<any>(this.url+'/updateAuthor/'+author.id, author);
  }

  deleteAuthors(id: string) {
    
    return this.http.delete<any>(this.url+'/deleteAuthor/'+id);
  }

}
