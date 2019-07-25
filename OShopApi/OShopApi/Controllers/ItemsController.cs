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
    public class ItemsController : ApiController
    {
        private OShopEntities db = new OShopEntities();

        public ItemsController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        private Expression<Func<Item, ItemViewModel>> AsItemViewModel =
            x => new ItemViewModel
            {
                CategoryId = x.CategoryId,
                CategoryName = x.Category.Name,
                Description = x.Description,
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                ImageUrl = x.ImageUrl
            };

        // GET: api/Items
        public IQueryable<ItemViewModel> GetItem()
        {
            return db.Item.Select(AsItemViewModel);
        }

        // GET: api/Items/5
        [ResponseType(typeof(ItemViewModel))]
        public async Task<IHttpActionResult> GetItem(int id)
        {
            ItemViewModel item = await db.Item.Select(AsItemViewModel).Where(i => i.Id == id).FirstOrDefaultAsync();
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/Items/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutItem(int id, Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            db.Entry(item).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        // POST: api/Items
        [ResponseType(typeof(Item))]
        public async Task<IHttpActionResult> PostItem(Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Item.Add(item);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = item.Id }, item);
        }

        // DELETE: api/Items/5
        [ResponseType(typeof(Item))]
        public async Task<IHttpActionResult> DeleteItem(int id)
        {
            Item item = await db.Item.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            db.Item.Remove(item);
            await db.SaveChangesAsync();

            return Ok(item);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ItemExists(int id)
        {
            return db.Item.Count(e => e.Id == id) > 0;
        }
    }
}