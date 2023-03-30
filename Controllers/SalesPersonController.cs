using BeSpokedBikesSalseTrackingApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BeSpokedBikesSalseTrackingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SalesPersonController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public SalesPersonController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //get sales person data
        [HttpGet]
        public IEnumerable<SalesPersons> Get()
        {
            var salesPersons = _dbContext.SalesPerson.ToList();
            return salesPersons;
        }

        //get sales person data by id
        [Route("getSalsePersonById/{salesPersonId}")]
        [HttpGet]
        public SalesPersons GetSalsePersonById(Guid salesPersonId)
        {
            var salesPer = _dbContext.SalesPerson.ToList().Where(x => x.SalesPersonId == salesPersonId).FirstOrDefault();
            return salesPer;
        }

        //update sales person info
        [HttpPost]
        public IActionResult UpdateSalsePerson([FromBody] SalesPersons salesData)
        {
            var existingProd = _dbContext.SalesPerson.ToList().Find(x => x.SalesPersonId == salesData.SalesPersonId);

            if (existingProd == null)
            {
                return NotFound();
            }

            existingProd.FirstName = salesData.FirstName;
            existingProd.LastName = salesData.LastName;
            existingProd.Address = salesData.Address;
            existingProd.Phone = salesData.Phone;

            _dbContext.SaveChanges();

            return Ok();
        }

    }
}