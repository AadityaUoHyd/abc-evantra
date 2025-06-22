export interface ErrorResponse {
  error: string;
}

export const isErrorResponse = (obj: any): obj is ErrorResponse => {
  return (
    obj &&
    typeof obj === "object" &&
    "error" in obj &&
    typeof obj.error === "string"
  );
};

export enum EventStatusEnum {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface CreateTicketTypeRequest {
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
  description: string;
  totalAvailable?: number;
  seatLeft?: number;
}

export interface CreateEventRequest {
  name: string;
  eventDescription: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: CreateTicketTypeRequest[];
}

export interface UpdateTicketTypeRequest {
  id: string | undefined;
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
  description: string;
  totalAvailable?: number;
  seatLeft?: number;
}

export interface UpdateEventRequest {
  id: string;
  name: string;
  eventDescription: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: UpdateTicketTypeRequest[];
}

export interface TicketTypeSummary {
  id: string;
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
  description: string;
  totalAvailable?: number;
  seatLeft?: number;
}

export interface EventSummary {
  id: string;
  name: string;
  eventDescription: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: TicketTypeSummary[];
  imageUrl?: string;
}

export interface PublishedEventSummary {
  id: string;
  name: string;
  eventDescription: string;
  start?: Date;
  end?: Date;
  venue: string;
  imageUrl?: string;
}

export interface TicketTypeDetails {
  id: string;
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
  description: string;
  totalAvailable?: number;
  seatLeft?: number;
}

export interface EventDetails {
  id: string;
  name: string;
  eventDescription: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: TicketTypeDetails[];
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

export interface SpringBootPagination<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface PublishedEventTicketTypeDetails {
  id: string;
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
  description: string;
  seatLeft?: number;
}

export interface PublishedEventDetails {
  id: string;
  name: string;
  eventDescription: string;
  start?: Date;
  end?: Date;
  venue: string;
  imageUrl?: string;
  ticketTypes: PublishedEventTicketTypeDetails[];
}

export enum TicketStatus {
  PURCHASED = "PURCHASED",
  CANCELLED = "CANCELLED",
}

export interface TicketSummaryTicketType {
  id: string;
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
}

export interface TicketSummary {
  id: string;
  status: TicketStatus;
  ticketType: TicketSummaryTicketType;
}

export interface TicketDetails {
  id: string;
  status: TicketStatus;
  name: string;
  price: number;
  gstRate: number;
  discountRate: number;
  description: string;
  eventName: string;
  eventVenue: string;
  eventStart: Date;
  eventEnd: Date;
}

export enum TicketValidationMethod {
  QR_SCAN = "QR_SCAN",
  MANUAL = "MANUAL",
}

export enum TicketValidationStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  EXPIRED = "EXPIRED",
}

export interface TicketValidationRequest {
  id: string;
  method: TicketValidationMethod;
}

export interface TicketValidationResponse {
  ticketId: string;
  status: TicketValidationStatus;
}

export interface PurchaseTicketResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface OrganizerAnalyticsResponse {
  totalTicketsSold: number;
  totalRevenue: number;
  topEvents: TopEventAnalytics[];
  ticketTypeRevenue: TicketTypeRevenue[];
}

export interface TopEventAnalytics {
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketsSold: number;
  revenue: number;
}

export interface TicketTypeRevenue {
  ticketTypeId: string;
  ticketTypeName: string;
  revenue: number;
  percentage: number;
}