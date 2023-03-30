using BeSpokedBikesSalseTrackingApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;

namespace BeSpokedBikesSalseTrackingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public CustomerController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //get Customer data
        [HttpGet]
        public IEnumerable<Customers> Get()
        {
            var customers = _dbContext.Customer.ToList();
            return customers;
        }
    }
}