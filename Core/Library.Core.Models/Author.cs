using System;
using System.Collections.Generic;
using System.Text;

namespace Library.Core.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string  Name { get; set; }
        public string LastName { get; set; }
        public DateTime Birth { get; set; }
    }
}
