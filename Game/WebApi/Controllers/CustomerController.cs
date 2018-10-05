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
	[Route("api/Customer")]
	public class CustomerController : Controller
	{
		public Context _context;
		public CustomerController()
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
		public IEnumerable GetCustomer()

		{
			return _context.cusList;
		}

		[HttpGet("{name}")]
		public IActionResult GetCustomer([FromRoute]string name)

		{
			var cus = _context.cusList.Where(_ => _.Name == name).First();
			var item = _context.gameMap.Where(_ => _.X == cus.X && _.Y == cus.Y);
			if (item.Count() > 0)
				return Ok(item.First());
			else
				return Ok("Not Found");
		}

		[HttpGet("{name}/{info}")]
		public IActionResult GetCustomer([FromRoute]string name, [FromRoute]string info)

		{
			var cus = _context.cusList.Where(_ => _.Name == name).First();
			return Ok(cus);
		}

		[HttpGet("{attr}/{name}/{value}")]
		public IActionResult GetCustomer([FromRoute]string attr, [FromRoute]string name, [FromRoute]string value){
			var cus = _context.cusList.Where(_ => _.Name == name).First();
			if (attr.ToUpper() == "TOOL")
				cus.Tool.Remove(value);
			else if (attr.ToUpper() == "TIME")
				cus.Time = int.Parse(value);
			else if(attr.ToUpper()=="SCORE")
				cus.Coin += int.Parse(value);
			return Ok("Update Successful");
		}


		[HttpPost("{x}/{y}")]
		public IActionResult PostCustomer([FromRoute]int x, [FromRoute]int y, [FromBody]Customer cus)
		{
			var customer = _context.cusList.Where(_ => _.Name == cus.Name).ToList();
			if (customer.Count == 0)
			{
				return Ok("Save Failed");
			}
			else
			{
				customer[0].X = x;
				customer[0].Y = y;
				customer[0].Story = cus.Story;
				return Ok("Save Success");
			}
		}


		[HttpPost]
		public IActionResult PostCustomer([FromBody]Customer cus)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			var customer = _context.cusList.Where(_ => _.Name == cus.Name).ToList();
			
			if (customer.Count == 0)
			{
				_context.cusList.Add(cus);
				return Ok(cus);
			}
			else
			{
				return Ok("Already Register!!!");
			}

		}
	}
}