using Newtonsoft.Json;

namespace BeSpokedBikesSalseTrackingApp.Models
{
    public class Products
    {
        public Guid ProductID { get; set; }
        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Style { get; set; }
        public double PurchasePrice { get; set; }
        public double SalePrice { get; set; }
        public int Qty { get; set; }
        public double Commission { get; set; }

    }
    public class ProductJson
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Qty { get; set; }

        public double Commission { get; set; }
    }
}
