using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OShopApi.Models.ViewModels
{
    public class ShoppingCartItemViewModel
    {
        public int Id { get; set; }
        public int ShoppingCartId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal ItemPrice { get; set; }
        public int QTY { get; set; }
        public decimal TotalPrice { get; set; }
        public string ImageUrl { get; set; }
    }
}