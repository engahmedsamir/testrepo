using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OShopApi.Models.ViewModels
{
    public class OrderItemViewModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string ImageUrl { get; set; }
        public int QTY { get; set; }
        public decimal UnitPrice { get; set; }
        public Nullable<decimal> TotalPrice { get; set; }
    }
}