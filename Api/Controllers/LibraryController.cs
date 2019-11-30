using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBLibrary;
using Library.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {

        private readonly LibraryContext _libraryContext;

        public LibraryController(LibraryContext libraryContext)
        {
            _libraryContext = libraryContext;
        }

        #region Authors

        //api/[controller]/Authors"
        [HttpGet]
        [Route("listAuthors")]
        public ActionResult<IEnumerable<Author>> Authors()
        {
            var list = _libraryContext.Authors.ToList();
            return list;
        }

        [HttpPost]
        [Route("saveAuthor")]
        public ActionResult<string> Post([FromBody] Author a)
        {
            try
            {
                _libraryContext.Authors.Add(a);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        [HttpPut]
        [Route("updateAuthor/{id}")]
        public ActionResult<string> Put(int id, [FromBody] Author a)
        {
            try
            {
                _libraryContext.Authors.Update(a);
                _libraryContext.Authors.Update(a);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        // DELETE api/values/5
        [HttpDelete]
        [Route("deleteAuthor/{id}")]
        public ActionResult<string> deleteAuthor(int id)
        {
            try
            {
                var obj = _libraryContext.Authors.Where(x => x.Id == id).FirstOrDefault();
                _libraryContext.Authors.Remove(obj);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        #endregion
        
        #region Categories

        //api/[controller]/Authors"
        [HttpGet]
        [Route("listCategories")]
        public ActionResult<IEnumerable<Category>> Categories()
        {
            var list = _libraryContext.Categories.ToList();
            return list;
        }

        [HttpPost]
        [Route("saveCategories")]
        public ActionResult<string> SaveCategories([FromBody] Category c)
        {
            try
            {
                _libraryContext.Categories.Add(c);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        [HttpPut]
        [Route("updateCategories/{id}")]
        public ActionResult<string> UpdateCategories(int id, [FromBody] Category c)
        {
            try
            {
                _libraryContext.Categories.Update(c);
               var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        // DELETE api/values/5
        [HttpDelete]
        [Route("deleteCategories/{id}")]
        public ActionResult<string> deleteCategories(int id)
        {
            try
            {
                var obj = _libraryContext.Categories.Where(x => x.Id == id).FirstOrDefault();
                _libraryContext.Categories.Remove(obj);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        #endregion

        #region Books

        //api/[controller]/Authors"
        [HttpGet]
        [Route("listBooks")]
        public ActionResult<IEnumerable<Book>> Books()
        {
            var list = _libraryContext.Books.Include(c => c.Author).Include(a=>a.Category)
            .ToList();
            return list;
        }
         
        [HttpPost]
        [Route("saveBooks")]
        public ActionResult<string> SaveBooks([FromBody] Book b)
        {
            try
            {

                b.Author = _libraryContext.Authors.Where(x => x.Id == b.Author.Id).FirstOrDefault();
                b.Category = _libraryContext.Categories.Where(x => x.Id == b.Category.Id).FirstOrDefault();
                _libraryContext.Books.Add(b);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        [HttpPut]
        [Route("updateBooks/{id}")]
        public ActionResult<string> UpdateBooks(int id, [FromBody] Book b)
        {
            try
            {
                b.Author = _libraryContext.Authors.Where(x => x.Id == b.Author.Id).FirstOrDefault();
                b.Category = _libraryContext.Categories.Where(x => x.Id == b.Category.Id).FirstOrDefault();
                _libraryContext.Books.Update(b);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        // DELETE api/values/5
        [HttpDelete]
        [Route("deleteBooks/{id}")]
        public ActionResult<string> deleteBooks(int id)
        {
            try
            {
                var obj = _libraryContext.Books.Where(x => x.Id == id).FirstOrDefault();
                _libraryContext.Books.Remove(obj);
                var idObject = _libraryContext.SaveChanges();
                return idObject.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        // Search 
        [HttpGet]
        [Route("searchBooks/{id}")]
        public ActionResult<IEnumerable<Book>> searchBooks(string id)
        {
            try
            {
                string text = id;
                var list = _libraryContext.Books.Include(c => c.Author).Include(a => a.Category).ToList();
                if (string.IsNullOrEmpty(text)) return list;
                var books = list.Where(x => x.Name == text).ToList();
                var categories = list.Where(x => x.Category.Name == text).ToList();
                var author = list.Where(x => x.Author.Name == text).ToList();

                var result = books.Union(categories).Union(author).ToList();
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error " + ex.Message);
            }
        }

        #endregion
    }
}
