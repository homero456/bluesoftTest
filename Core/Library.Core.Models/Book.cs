using System;

namespace Library.Core.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ISBN { get; set; }

       
        public Category Category { get; set; }
        public Author Author { get; set; }

    }
}
