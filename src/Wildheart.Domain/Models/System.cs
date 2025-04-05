using System;
using System.Collections.Generic;

namespace Wildheart.Domain.Models
{
    public class System
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Namespace { get; set; }
        public required string IpAddress { get; set; }
        public required bool IsKubernetes { get; set; }
        public required Guid ProjectId { get; set; }
        public required Guid TeamId { get; set; }
        public required string Tag { get; set; }
        public SystemStatus Status { get; set; }

        // Navigation properties
        public virtual Project Project { get; set; }
        public virtual Team Team { get; set; }
        public virtual ICollection<SystemRelationship> SourceRelationships { get; set; }
        public virtual ICollection<SystemRelationship> TargetRelationships { get; set; }
    }

    public enum SystemStatus
    {
        Active,
        Inactive,
        Maintenance,
        Deprecated
    }
}