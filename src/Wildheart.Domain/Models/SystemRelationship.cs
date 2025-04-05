using System;

namespace Wildheart.Domain.Models
{
    public class SystemRelationship
    {
        public Guid Id { get; set; }
        public Guid SourceSystemId { get; set; }
        public Guid TargetSystemId { get; set; }
        public RelationshipType Type { get; set; }

        // Navigation properties
        public virtual System SourceSystem { get; set; }
        public virtual System TargetSystem { get; set; }
    }

    public enum RelationshipType
    {
        Dependency,
        Synchronization,
        Integration,
        DataFlow,
        Authentication,
        Authorization
    }
}