
import { Author } from './author';
import { Categoria } from './categoria';


export class Book {
    
    public id:number;
    public name:string;
    public category:Categoria;   
    public author:Author;   
    public isbn:string;
    
}
