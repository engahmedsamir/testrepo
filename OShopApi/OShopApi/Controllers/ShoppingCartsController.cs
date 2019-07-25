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
    public class ShoppingCartsController : ApiController
    {
        private OShopEntities db = new OShopEntities();

        public ShoppingCartsController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        private Expression<Func<ShoppingCart, ShoppingCartViewModel>> AsShoppingCartViewModel =
            x => new ShoppingCartViewModel
            {
                CreatedDate = x.CreatedDate,
                Id = x.Id,
                Items = x.ShoppingCartItem.ToList()
            };


        // GET: api/ShoppingCarts
        public IQueryable<ShoppingCart> GetShoppingCart()
        {
            return db.ShoppingCart;
        }

        // GET: api/ShoppingCarts/5
        [ResponseType(typeof(ShoppingCartViewModel))]
        public async Task<IHttpActionResult> GetShoppingCart(int id)
        {
            ShoppingCartViewModel shoppingCart = await db.ShoppingCart.Include(x => x.ShoppingCartItem).Select(AsShoppingCartViewModel).Where(c => c.Id == id).FirstOrDefaultAsync();
            if (shoppingCart == null)
            {
                return NotFound();
            }

            return Ok(shoppingCart);
        }

        // PUT: api/ShoppingCarts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutShoppingCart(int id, ShoppingCart shoppingCart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != shoppingCart.Id)
            {
                return BadRequest();
            }

            db.Entry(shoppingCart).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartExists(id))
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

        // POST: api/ShoppingCarts
        [ResponseType(typeof(ShoppingCart))]
        public async Task<IHttpActionResult> PostShoppingCart()
        {
            ShoppingCart shoppingCart = new ShoppingCart();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            shoppingCart.CreatedDate = DateTime.Now;
            db.ShoppingCart.Add(shoppingCart);

            await db.SaveChangesAsync();

            return Ok(shoppingCart);
        }

        // DELETE: api/ShoppingCarts/5
        [ResponseType(typeof(ShoppingCart))]
        public async Task<IHttpActionResult> DeleteShoppingCart(int id)
        {
            ShoppingCart shoppingCart = await db.ShoppingCart.FindAsync(id);
            if (shoppingCart == null)
            {
                return NotFound();
            }

            db.ShoppingCart.Remove(shoppingCart);
            await db.SaveChangesAsync();

            return Ok(shoppingCart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ShoppingCartExists(int id)
        {
            return db.ShoppingCart.Count(e => e.Id == id) > 0;
        }
    }
}