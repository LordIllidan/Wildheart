using System;

namespace Wildheart.Domain.Models
{
    public class DomainEvent
    {
        public Guid EventId { get; set; }
        public Guid AggregateId { get; set; }
        public string Payload { get; set; }
        public DateTime Timestamp { get; set; }
        public string EventType { get; set; }
    }
}