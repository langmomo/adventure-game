using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Customer
    {
		[Key]
		public String Name { get; set; }
		public String Password { get; set; }
		public int Coin { get; set; }
		public int X { get; set; }
		public int Y { get; set; }
		public int Time { get; set; }
		public List<String> Story { get; set; } = new List<string>();
		public List<String> Tool { get; set; } = new List<string>();
	}
}
