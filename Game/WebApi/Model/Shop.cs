using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Shop
    {
		[Key]
		public int Coin { get; set; }
		public string Pic { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
	}
}
