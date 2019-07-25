using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OShopApi.Models.ViewModels
{
    public class ShoppingCartViewModel
    {
        public int Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public virtual List<ShoppingCartItem> Items { get; set; }
    }
}