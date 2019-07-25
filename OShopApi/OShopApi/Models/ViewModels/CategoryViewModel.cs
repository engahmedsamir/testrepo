using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OShopApi.Models.ViewModels
{
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ItemsCount { get; set; }
    }
}