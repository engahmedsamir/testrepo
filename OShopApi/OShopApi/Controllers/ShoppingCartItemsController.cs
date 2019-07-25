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
    public class ShoppingCartItemsController : ApiController
    {
        private OShopEntities db = new OShopEntities();

        public ShoppingCartItemsController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        private Expression<Func<ShoppingCartItem, ShoppingCartItemViewModel>> AsShoppingCartItemViewModel =
            x => new ShoppingCartItemViewModel
            {
                Id = x.Id,
                ItemId = x.ItemId,
                ItemName = x.Item.Name,
                ItemPrice = x.Item.Price,
                QTY = x.QTY,
                ShoppingCartId = x.ShoppingCartId,
                TotalPrice = x.QTY * x.Item.Price,
                ImageUrl = x.Item.ImageUrl
            };

        // GET: api/ShoppingCartItems
        public IQueryable<ShoppingCartItemViewModel> GetShoppingCartItem()
        {
            return db.ShoppingCartItem.Select(AsShoppingCartItemViewModel);
        }

        // GET: api/ShoppingCartItems
        [Route("api/ShoppingCartItems/shoppingcart/{id}")]
        public IQueryable<ShoppingCartItemViewModel> GetShoppingCartItems(int id)
        {
            return db.ShoppingCartItem.Where(c => c.ShoppingCartId == id).Select(AsShoppingCartItemViewModel);
        }

        // DELETE: api/ShoppingCartItems
        [Route("api/ShoppingCartItems/shoppingcart/{id}")]
        public async Task<IHttpActionResult> DeleteShoppingCartItems(int id)
        {
            IQueryable<ShoppingCartItem> items = db.ShoppingCartItem.Where(c => c.ShoppingCartId == id);
            if (items == null)
            {
                return NotFound();
            }

            db.ShoppingCartItem.RemoveRange(items);
            await db.SaveChangesAsync();
            return Ok(items);
        }

        // GET: api/ShoppingCartItems/5
        [ResponseType(typeof(ShoppingCartItemViewModel))]
        public async Task<IHttpActionResult> GetShoppingCartItem(int id)
        {
            ShoppingCartItemViewModel shoppingCartItem = await db.ShoppingCartItem.Select(AsShoppingCartItemViewModel).Where(c => c.ShoppingCartId == id).FirstOrDefaultAsync();
            if (shoppingCartItem == null)
            {
                return NotFound();
            }

            return Ok(shoppingCartItem);
        }

        // GET: api/ShoppingCarts/5/Items/3
        [ResponseType(typeof(ShoppingCartItemViewModel))]
        [Route("api/shoppingcarts/{cartId}/items/{itemId}")]
        public async Task<IHttpActionResult> GetShoppingCartItem(int cartId, int itemId)
        {
            ShoppingCartItemViewModel shoppingCartItem = await db.ShoppingCartItem.Where(ci => ci.ShoppingCartId == cartId && ci.ItemId == itemId)
                .Select(AsShoppingCartItemViewModel).FirstOrDefaultAsync();
            //if (shoppingCartItem == null)
            //{
            //    return NotFound();
            //}

            return Ok(shoppingCartItem);
        }



        // PUT: api/ShoppingCartItems/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutShoppingCartItem(int id, ShoppingCartItem shoppingCartItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != shoppingCartItem.Id)
            {
                return BadRequest();
            }

            db.Entry(shoppingCartItem).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartItemExists(id))
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

        // POST: api/ShoppingCartItems
        [ResponseType(typeof(ShoppingCartItem))]
        public async Task<IHttpActionResult> PostShoppingCartItem(ShoppingCartItem shoppingCartItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ShoppingCartItem.Add(shoppingCartItem);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = shoppingCartItem.Id }, shoppingCartItem);
        }

        // DELETE: api/ShoppingCartItems/5
        [ResponseType(typeof(ShoppingCartItem))]
        public async Task<IHttpActionResult> DeleteShoppingCartItem(int id)
        {
            ShoppingCartItem shoppingCartItem = await db.ShoppingCartItem.FindAsync(id);
            if (shoppingCartItem == null)
            {
                return NotFound();
            }

            db.ShoppingCartItem.Remove(shoppingCartItem);
            await db.SaveChangesAsync();

            return Ok(shoppingCartItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ShoppingCartItemExists(int id)
        {
            return db.ShoppingCartItem.Count(e => e.Id == id) > 0;
        }
    }
}