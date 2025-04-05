# Wildheart Domain Models

This document provides an overview of the domain models used in the Wildheart project, both for the backend (.NET) and frontend (Angular).

## Backend Models (.NET)

### System
| Property | Type | Description |
|----------|------|-------------|
| Id | Guid | Unique identifier |
| Name | string | Name of the system |
| Namespace | string | Namespace of the system |
| IpAddress | string | IP address of the system |
| IsKubernetes | bool | Indicates if the system is deployed on Kubernetes |
| ProjectId | Guid | ID of the associated project |
| TeamId | Guid | ID of the team responsible for the system |
| Tag | string | Tag for categorization |
| Status | SystemStatus | Current status of the system |

### Project
| Property | Type | Description |
|----------|------|-------------|
| Id | Guid | Unique identifier |
| Name | string | Name of the project |
| Description | string | Description of the project |
| Manager | string | Project manager |
| StartDate | DateTime | Project start date |
| EndDate | DateTime? | Project end date (nullable) |

### Team
| Property | Type | Description |
|----------|------|-------------|
| Id | Guid | Unique identifier |
| Name | string | Name of the team |
| JiraGroupId | string | Jira group ID for the team |

### User
| Property | Type | Description |
|----------|------|-------------|
| Id | Guid | Unique identifier |
| Login | string | User login |
| FirstName | string | User's first name |
| LastName | string | User's last name |
| Email | string | User's email |
| Roles | List<string> | User's roles |

### SystemRelationship
| Property | Type | Description |
|----------|------|-------------|
| Id | Guid | Unique identifier |
| SourceSystemId | Guid | ID of the source system |
| TargetSystemId | Guid | ID of the target system |
| Type | RelationshipType | Type of relationship |

### DomainEvent
| Property | Type | Description |
|----------|------|-------------|
| EventId | Guid | Unique identifier for the event |
| AggregateId | Guid | ID of the aggregate that generated the event |
| Payload | string | Event data |
| Timestamp | DateTime | When the event occurred |
| EventType | string | Type of the event |

## Frontend Models (TypeScript)

### System
| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| name | string | Name of the system |
| namespace | string | Namespace of the system |
| ipAddress | string | IP address of the system |
| isKubernetes | boolean | Indicates if the system is deployed on Kubernetes |
| projectId | string | ID of the associated project |
| teamId | string | ID of the team responsible for the system |
| tag | string | Tag for categorization |
| status | SystemStatus | Current status of the system |

### Project
| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| name | string | Name of the project |
| description | string | Description of the project |
| manager | string | Project manager |
| startDate | Date | Project start date |
| endDate | Date | Project end date (optional) |

### Team
| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| name | string | Name of the team |
| jiraGroupId | string | Jira group ID for the team |

### User
| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| login | string | User login |
| firstName | string | User's first name |
| lastName | string | User's last name |
| email | string | User's email |
| roles | string[] | User's roles |

### SystemRelationship
| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| sourceSystemId | string | ID of the source system |
| targetSystemId | string | ID of the target system |
| type | RelationshipType | Type of relationship |

### DomainEvent
| Property | Type | Description |
|----------|------|-------------|
| eventId | string | Unique identifier for the event |
| aggregateId | string | ID of the aggregate that generated the event |
| payload | string | Event data |
| timestamp | Date | When the event occurred |
| eventType | string | Type of the event |

## Enums

### SystemStatus
- Active
- Inactive
- Maintenance
- Deprecated

### RelationshipType
- Dependency
- Synchronization
- Integration
- DataFlow
- Authentication
- Authorization 