using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OShopApi.Models.ViewModels
{
    public class ItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}