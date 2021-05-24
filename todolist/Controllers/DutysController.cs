using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using todolist.Entities;
using todolist.Services;

namespace todolist.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DutysController : ControllerBase
    {
        /// <summary>
        /// Duty service.
        /// </summary>
        private readonly DutyServices services;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="services"></param>
        public DutysController(DutyServices services)
        {
            this.services = services;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Duty> dutys = this.services.Get();
            return Ok(dutys);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Duty newDuty)
        {
            this.services.Create(newDuty);
            return Ok(new { id = newDuty.Id });
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, Duty bookIn)
        {
            this.services.Update(id, bookIn);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            this.services.Remove(id);
            return NoContent();
        }
    }
}
