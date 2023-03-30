namespace BeSpokedBikesSalseTrackingApp.Models
{
    public class Discounts
    {
        public Guid DiscountId { get; set; }
        public Guid ProductId { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime EndDate { get; set; }
        public double Discount { get; set; }
    }
}
