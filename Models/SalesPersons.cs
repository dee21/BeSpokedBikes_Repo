namespace BeSpokedBikesSalseTrackingApp.Models
{
    public class SalesPersons
    {
        public Guid SalesPersonId { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Manager { get; set; }
    }
}
