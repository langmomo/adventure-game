using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
	public class Context
	{
		public static Context context;
		public List<Customer> cusList { get; set; }
		public Map[] gameMap { get; set; }
		public Shop[] items { get; set; }
		public Context()
		{
			var cus = new Customer { Name = "lm", Password = "123", Coin = 0, X = 0, Y = 0, Time=0};
			this.cusList = new List<Customer>();
			this.cusList.Add(cus);

			this.gameMap = new Map[] {
				new Map { X=0, Y=0, Color="blue", Scene="Start", Story="Welcome to Game. Please click 'Game' to start!"},
				new Map { X=0, Y=1, Color="blue", Scene="snakegame", Story="You can earn some coins in this game!"},
				new Map { X=0, Y=2, Color="blue",  Scene="trap", Story="Here is a trap. You have to wait 10 seconds if you don't have a pass card."},
				new Map { X=0, Y=3, Color="blue", Scene="shop", Story="Congradulation. You get a chance to buy tool in our shop. These tool will help you when you meet trouble."},
				new Map { X=0, Y=4, Color="blue", Scene="trap", Story="Here is a trap. You have to wait 10 seconds if you don't have a pass card."},
				new Map { X=0, Y=5, Color="blue", Scene="shop", Story="You get a chance to buy tools in our shop. These tools will help you."},
				new Map { X=1, Y=5, Color="blue", Scene="snakegame", Story="You can earn some coins in this game!"},
				new Map { X=2, Y=5, Color="blue", Scene="empty", Story="Move forword!!"},
				new Map { X=2, Y=4, Color="blue", Scene="shop", Story="You get a chance to buy tools in our shop. These tools will help you."},
				new Map { X=2, Y=3, Color="blue",Scene="snakegame", Story="You can earn some coins in this game!"},
				new Map { X=2, Y=2, Color="blue", Scene="trap", Story="Here is a trap. You have to wait 10 seconds if you don't have a pass card."},
				new Map { X=2, Y=1, Color="blue", Scene="snakegame", Story="You can earn some coins in this game!"},
				new Map { X=2, Y=0, Color="blue", Scene="empty", Story="Move forword!!"},
				new Map { X=3, Y=0, Color="blue", Scene="shop", Story="You get a chance to buy tools in our shop. These tools will help you."},
				new Map { X=4, Y=0, Color="blue", Scene="trap", Story="Here is a trap. You have to wait 10 seconds if you don't have a pass card."},
				new Map { X=4, Y=1, Color="blue", Scene="snakegame", Story="You can earn some coins in this game!"},
				new Map { X=4, Y=2, Color="blue", Scene="empty", Story="Move forword!!"},
				new Map { X=4, Y=3, Color="blue", Scene="snakegame", Story="You can earn some coins in this game!"},
				new Map { X=4, Y=4, Color="blue", Scene="trap", Story="Here is a trap. You have to wait 10 seconds if you don't have a pass card."},
				new Map { X=4, Y=5, Color="blue", Scene="End", Story="Congradulation, you complete all tests!"}
			};

			this.items = new Shop[]{
				//new Shop {Description="Escape From Trap", Name="Rope", Coin=2, Pic="http://vectors.ryanlerch.org/rope-ring/rope-ring.svg"},
				//new Shop {Description="Go to Game", Name="Game Card", Coin=2, Pic="https://d30y9cdsu7xlg0.cloudfront.net/png/36448-200.png" },
				//new Shop {Description="Go Shopping", Name="Shopping Card", Coin=2, Pic="https://www.svgrepo.com/show/130868/hand-holding-two-soccer-cards.svg" },
				new Shop {Description="Pass this challenge", Name="Pass Card", Coin=3, Pic="https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-glyphs-3/128/139-512.png"},
			};
		}
    }
}
