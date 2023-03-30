using BeSpokedBikesSalseTrackingApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;

namespace BeSpokedBikesSalseTrackingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiscountController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public DiscountController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Discounts> Get()
        {
            var discount = _dbContext.Discount.ToList();
            return discount;
        }
    }
}