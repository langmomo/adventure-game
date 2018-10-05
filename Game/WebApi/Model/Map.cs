using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Map
    {
		[Key]
		public int X { get; set; }
		public int Y { get; set; }
		public string Color { get; set; }
		public string Scene { get; set; }
		public string Story { get; set; }
		public List<string> cusList { get; set; } = new List<string>();

	}
}

