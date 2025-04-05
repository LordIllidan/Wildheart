using System;
using System.Collections.Generic;

namespace Wildheart.Domain.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string JiraGroupId { get; set; }

        // Navigation properties
        public virtual ICollection<User> Members { get; set; }
        public virtual ICollection<System> Systems { get; set; }
    }
}