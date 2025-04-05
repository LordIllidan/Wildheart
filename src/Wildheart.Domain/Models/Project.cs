using System;
using System.Collections.Generic;

namespace Wildheart.Domain.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Manager { get; set; }
        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Navigation properties
        public virtual ICollection<System> Systems { get; set; }
    }
}