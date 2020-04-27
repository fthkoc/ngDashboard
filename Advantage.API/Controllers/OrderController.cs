using System;
using System.Linq;
using Advantage.API.Data;
using Advantage.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Advantage.API.Controllers
{
    [Route("api/{controller}")]
    public class OrderController : Controller
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        // GET api/order/1/10
        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public IActionResult Get(int pageIndex, int pageSize)
        {
            var data = _context.Orders.Include(o => o.Customer).OrderByDescending(c => c.TimePlaced);
            
            var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);
            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double) totalCount / pageSize);

            var response = new 
            {
                Page = page,
                totalPages = totalPages,
            };
            
            return Ok(response);
        }

        [HttpGet("ByState")]
        public IActionResult ByState()
        {
            var data = _context.Orders.Include(o => o.Customer).ToList();

			var groupedData = data.GroupBy(o => o.Customer.State).ToList()
				.Select(group => new {
					State = group.Key,
					Total = group.Sum(x => x.Total)
				})
				.OrderByDescending(result => result.Total)
				.ToList();
            
            return Ok(groupedData);
        }

		[HttpGet("ByCustomer/{n}")]
        public IActionResult ByCustomer(int n)
        {
            var data = _context.Orders.Include(o => o.Customer).ToList();

			var groupedData = data.GroupBy(o => o.Customer.ID).ToList()
				.Select(group => new {
					Name = _context.Customers.Find(group.Key).Name,
					Total = group.Sum(x => x.Total)
				})
				.OrderByDescending(result => result.Total)
				.Take(n)
				.ToList();
            
            return Ok(groupedData);
        }

		[HttpGet("GetOrder/{id}", Name="GetOrder")]
        public IActionResult GetOrder(int id)
        {
            var data = _context.Orders.Include(o => o.Customer)
				.First(o => o.ID == id);
			return Ok(data);
		}
    }
}