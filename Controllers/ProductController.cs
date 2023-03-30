using BeSpokedBikesSalseTrackingApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeSpokedBikesSalseTrackingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public ProductController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //get Product Details
        [HttpGet]
        public IEnumerable<Products> Get()
        {
            var products = _dbContext.Product.ToList();
            return products;
        }

        //get Product by product id
        [Route("getProductById/{productId}")]
        [HttpGet]
        public Products GetProductById(Guid productId)
        {
            var product = _dbContext.Product.ToList().Where(x => x.ProductID == productId).FirstOrDefault();
            return product;
        }

        //update product data
        [HttpPost]
        public IActionResult UpdateProduct([FromBody] ProductJson prodData)
        {
            var existingProd = _dbContext.Product.ToList().Find(x => x.ProductID == prodData.Id);

            if (existingProd == null)
            {
                return NotFound();
            }

            existingProd.Name = prodData.Name;
            existingProd.SalePrice = prodData.Price;
            existingProd.Qty = prodData.Qty;
            existingProd.Commission = prodData.Commission;

            _dbContext.SaveChanges();

            return Ok();
        }
    }
}