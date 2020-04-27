using System.Linq;
using Advantage.API.Data;
using Advantage.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Advantage.API.Controllers
{
    [Route("api/{controller}")]
    public class ServerController : Controller
    {
        private readonly DataContext _context;

        public ServerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.Servers.OrderBy(s => s.ID).ToList();
            return Ok(data);
        }

        [HttpGet("{id}", Name="GetServer")]
        public IActionResult Get(int id)
        {
            var data = _context.Servers.Find(id);
            return Ok(data);
        }

        [HttpPut("{id}")]
        public IActionResult Message(int id, [FromBody] ServerMessage message) 
        {
            var server = _context.Servers.Find(id);

            if (server == null)
            {
                return NotFound();
            }

            // TODO: Move into a service
            if (message.Payload == "activate")
            {
                server.IsOnline = true;
            }

            if (message.Payload == "deactivate")
            {
                server.IsOnline = false;
            }
            
            _context.SaveChanges();

            return new NoContentResult();
        }
    }
}