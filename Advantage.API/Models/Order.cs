using System;

namespace Advantage.API.Models
{
    public class Order
    {
        public int ID { get; set; }
        public Customer Customer { get; set; }
        public decimal Total { get; set; }
        public DateTime TimePlaced { get; set; }
        public DateTime? TimeCompleted { get; set; }
    }
}