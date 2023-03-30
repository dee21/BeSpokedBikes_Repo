namespace BeSpokedBikesSalseTrackingApp.Models
{
    public class Saless
    {
        public Guid SalesId { get; set; }
        public Guid ProductId { get; set; }
        public Guid SalesPersonId { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime SalesDate { get; set; }
    }

    public class SalesObject
    {
        public Guid SalesId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid SalesPersonId { get; set; }
        public string SalesPersonName { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public double Commission { get; set; }

    }


    public class SalessJosn
    {
        public Guid ProductId { get; set; }
        public Guid SalesPersonId { get; set; }
        public Guid CustomerId { get; set; }
        public string SalesDate { get; set; }
    }
}
