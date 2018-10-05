using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Map")]
    public class MapController : Controller
    {
		public Context _context;
		public MapController()
		{
			if (Context.context == null)
			{
				_context = new Context();
				Context.context = _context;
			}
			else
			{
				_context = Context.context;
			}


		}

		[HttpGet]
		public IEnumerable GetMap()

		{
			return _context.gameMap;
		}

		[HttpGet("{x}/{y}/{name}")]
		public IActionResult GetMap([FromRoute] int x, [FromRoute] int y, [FromRoute] string name)
		{
			var cus = _context.cusList.Where(_ => _.Name == name);
			if (cus.Count() > 0)
			{
				var item = _context.gameMap.Where(_ => _.cusList.ToList().Contains(name));
				if (item.Count() > 0)
				{
					item.First().cusList.Remove(name);
				}
				cus.First().X = x;
				cus.First().Y = y;
			
				var position = _context.gameMap.Where(_ => _.X == x && _.Y == y).First();
				position.cusList.Add(name);
				return Ok("Update Success");
			}
			else
			{
				return Content("Not Found");
			}
			
		}
	}
}