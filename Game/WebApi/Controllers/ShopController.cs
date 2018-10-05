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
    [Route("api/Shop")]
    public class ShopController : Controller
    {
		public Context _context;
		public ShopController()
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
		public IActionResult GetMap()

		{
			return Ok(_context.items);
		}

		[HttpGet("{cusName}")]
		public IActionResult GetMap([FromRoute] string cusName)

		{
			var cus = _context.cusList.Where(_ => _.Name == cusName);

			if (cus.Count() > 0)
			{
				var items = _context.items.Where(_ => _.Coin <= cus.First().Coin);
				if (items.Count() > 0)
				{
					return Ok(items);
				}
				else
				{
					return Content("Not Found!!");
				}
			}
			else
			{
				return Content("Not Found This Customer");
			}
			
		}
		[HttpGet("Tool/{cusName}")]
		public IActionResult GetShop([FromRoute] string cusName)
		{
			var cus = _context.cusList.Where(_ => _.Name == cusName);
			var tools = cus.First().Tool;
			if (tools.Count == 0)
			{
				return Ok("No tools");
			}
			else
			{
				return Ok(tools);
			}

		}
		[HttpGet("Order/{name}/{cusName}")]
		public IActionResult GetShop([FromRoute] string name, [FromRoute] string cusName)

		{
			var item = _context.items.Where(_ => _.Name == name);
			if (item.Count() > 0)
			{
				var coin = item.First().Coin;
				var cus = _context.cusList.Where(_ => _.Name == cusName);
				if (cus.Count() > 0)
				{
					if (cus.First().Coin < item.First().Coin)
					{
						return Ok("Balance Not Enough!");
					}
					else
					{
						cus.First().Coin -= item.First().Coin;
						cus.First().Tool.Add(item.First().Name);
						return Ok("Success");
					}
					
				}
			}
			return Content("Submit Failed");
			
		}
	}
}