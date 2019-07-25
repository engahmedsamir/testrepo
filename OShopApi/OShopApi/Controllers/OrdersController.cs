using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using OShopApi.Models;
using OShopApi.Models.ViewModels;
using System.Linq.Expressions;

namespace OShopApi.Controllers
{
    public class OrdersController : ApiController
    {
        private OShopEntities db = new OShopEntities();

        private Expression<Func<OrderItem, OrderItemViewModel>> AsOrderItemViewModel =
            x => new OrderItemViewModel
            {
                Id = x.Id,
                ItemId = x.ItemId,
                ItemName = x.Item.Name,
                OrderId = x.OrderId,
                QTY = x.QTY,
                TotalPrice = x.TotalPrice,
                UnitPrice = x.UnitPrice,
                ImageUrl = x.Item.ImageUrl
            };

        public OrdersController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        // GET: api/Orders
        public IQueryable<Order> GetOrder()
        {
            return db.Order;
        }

        // GET: api/Orders/User/1
        [Route("api/orders/user/{userId}")]
        public IQueryable<Order> GetOrdersByUser(int userId)
        {
            return db.Order.Where(c => c.UserId == userId);
        }

        [Route("api/orderitems/{orderId}")]
        public IQueryable<OrderItemViewModel> GetOrderItems(int orderId)
        {
            return db.OrderItem.Where(c => c.OrderId == orderId).Select(AsOrderItemViewModel);
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public async Task<IHttpActionResult> GetOrder(int id)
        {
            Order order = await db.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.Id)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        public async Task<IHttpActionResult> PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            order.PlacedDate = DateTime.Now;
            db.Order.Add(order);
            await db.SaveChangesAsync();

            return Ok(order.Id);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public async Task<IHttpActionResult> DeleteOrder(int id)
        {
            Order order = await db.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Order.Remove(order);
            await db.SaveChangesAsync();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Order.Count(e => e.Id == id) > 0;
        }
    }
}