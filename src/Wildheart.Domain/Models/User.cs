using System;
using System.Collections.Generic;

namespace Wildheart.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Login { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public List<string> Roles { get; set; } = new List<string>();

        // Navigation properties
        public virtual ICollection<Team> Teams { get; set; }
    }
}