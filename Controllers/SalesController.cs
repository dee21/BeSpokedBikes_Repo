using BeSpokedBikesSalseTrackingApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;

namespace BeSpokedBikesSalseTrackingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public SalesController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //update sales data
        [HttpGet]
        public IEnumerable<SalesObject> Get()
        {
            var sales = _dbContext.Sales.ToList();
            List<SalesObject> salesObj = new List<SalesObject>();
            foreach (var item in _dbContext.Sales.ToList())
            {
                SalesObject sl = new SalesObject();
                sl.SalesId = item.SalesId;

                sl.ProductId= item.ProductId;
                var product = _dbContext.Product.FirstOrDefault(p => p.ProductID == item.ProductId);
                if(product != null)
                {
                    sl.ProductName = product.Name;
                    sl.Commission = product.Commission;
                    sl.Price = product.SalePrice;
                }

                sl.SalesPersonId =  item.SalesPersonId;
                var salesPer = _dbContext.SalesPerson.FirstOrDefault(p => p.SalesPersonId == item.SalesPersonId);
                if (salesPer != null)
                {
                   sl.SalesPersonName = salesPer.FirstName + " " + salesPer.LastName;
                }

                sl.CustomerId = item.CustomerId;
                var customer = _dbContext.Customer.FirstOrDefault(p => p.CustomerId == item.CustomerId);
                if (customer != null)
                {
                    sl.CustomerName = customer.FirstName + " " + customer.LastName;
                }

                sl.Date = item.SalesDate;
                salesObj.Add(sl);
            }
            return salesObj;
        }

        //create new sale
        [HttpPost]
        public IActionResult CreateSales([FromBody] SalessJosn salesData)
        {
            var existingSale = _dbContext.Sales.ToList().Find(x => x.ProductId == salesData.ProductId 
                                                                && x.SalesPersonId == salesData.SalesPersonId
                                                                && x.CustomerId == salesData.CustomerId);
            if (existingSale != null)
            {
                return BadRequest("Invalid model data");
            }

            var newSales = new Saless();
            newSales.SalesId = Guid.NewGuid();
            newSales.ProductId = salesData.ProductId;
            newSales.SalesPersonId = salesData.SalesPersonId;
            newSales.CustomerId = salesData.CustomerId;
           
            string[] parts = salesData.SalesDate.Split('/');
            if(parts.Length == 3)
                newSales.SalesDate = new DateTime(Convert.ToInt32(parts[2]), Convert.ToInt32(parts[0]), Convert.ToInt32(parts[1]));

            _dbContext.Sales.Add(newSales);
            _dbContext.SaveChanges();
                
            return Ok();
        }
    }
}