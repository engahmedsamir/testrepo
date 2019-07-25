using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using OShopApi.Models;
using OShopApi.Models.ViewModels;

namespace OShopApi.Controllers
{
    public class CategoriesController : ApiController
    {
        private OShopEntities db = new OShopEntities();

        public CategoriesController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        private Expression<Func<Category, CategoryViewModel>> AsCategoryViewModel =
            x => new CategoryViewModel
            {
                Id = x.Id,
                Name = x.Name,
                ItemsCount = x.Item.Count
            };

        // GET: api/Categories
        public IQueryable<CategoryViewModel> GetCategory()
        {
            return db.Category.Select(AsCategoryViewModel);
        }

        // GET: api/Categories/5
        [ResponseType(typeof(CategoryViewModel))]
        public async Task<IHttpActionResult> GetCategory(int id)
        {
            CategoryViewModel category = await db.Category.Select(AsCategoryViewModel).Where(i => i.Id == id).FirstOrDefaultAsync();
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategory(int id, Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.Id)
            {
                return BadRequest();
            }

            db.Entry(category).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Categories
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Category.Add(category);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = category.Id }, category);
        }

        // DELETE: api/Categories/5
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> DeleteCategory(int id)
        {
            Category category = await db.Category.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Category.Remove(category);
            await db.SaveChangesAsync();

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Category.Count(e => e.Id == id) > 0;
        }
    }
}