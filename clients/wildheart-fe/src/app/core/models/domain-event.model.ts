export interface DomainEvent {
  eventId: string;
  aggregateId: string;
  payload: string;
  timestamp: Date;
  eventType: string;
} 