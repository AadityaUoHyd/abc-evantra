import {
  CreateEventRequest,
  EventDetails,
  EventSummary,
  isErrorResponse,
  PublishedEventDetails,
  PublishedEventSummary,
  PurchaseTicketResponse,
  SpringBootPagination,
  TicketDetails,
  TicketSummary,
  TicketValidationRequest,
  TicketValidationResponse,
  UpdateEventRequest,
  OrganizerAnalyticsResponse,
} from "@/domain/Domain";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_PREFIX = import.meta.env.MODE === 'development' ? '/api/v1' : `${BASE_URL}/api/v1`;

export const createEvent = async (
  accessToken: string,
  request: CreateEventRequest,
  image?: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append("event", new Blob([JSON.stringify(request)], { type: "application/json" }));
  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_PREFIX}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create event");
  }
};

export const updateEvent = async (
  accessToken: string,
  id: string,
  request: UpdateEventRequest,
  image?: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append("event", new Blob([JSON.stringify(request)], { type: "application/json" }));
  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_PREFIX}/events/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update event");
  }
};

export const getEvent = async (accessToken: string, id: string | undefined): Promise<EventDetails> => {
  const response = await fetch(`${API_PREFIX}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch event");
  }

  return response.json();
};

export const listEvents = async (
  accessToken: string,
  page: number,
): Promise<SpringBootPagination<EventSummary>> => {
  const response = await fetch(`${API_PREFIX}/events?page=${page}&size=2`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as SpringBootPagination<EventSummary>;
};

export const deleteEvent = async (
  accessToken: string,
  id: string,
): Promise<void> => {
  const response = await fetch(`${API_PREFIX}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const responseBody = await response.json();
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listPublishedEvents = async (
  page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
  const url = `${API_PREFIX}/published-events?page=${page}&size=50`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = `Failed to fetch events: ${response.status} ${response.statusText}`;
    try {
      const responseBody = await response.json();
      if (isErrorResponse(responseBody)) {
        errorMessage = responseBody.error;
      } else {
        console.error(JSON.stringify(responseBody));
      }
    } catch (e) {
      console.error("Non-JSON response:", await response.text());
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<SpringBootPagination<PublishedEventSummary>>;
};

export const searchPublishedEvents = async (
  query: string,
  page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
  const encodedQuery = encodeURIComponent(query);
  const url = `${API_PREFIX}/published-events?q=${encodedQuery}&page=${page}&size=50`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = `Failed to search events: ${response.status} ${response.statusText}`;
    try {
      const responseBody = await response.json();
      if (isErrorResponse(responseBody)) {
        errorMessage = responseBody.error;
      } else {
        console.error(JSON.stringify(responseBody));
      }
    } catch (e) {
      console.error("Non-JSON response:", await response.text());
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<SpringBootPagination<PublishedEventSummary>>;
};

export const getPublishedEvent = async (
  id: string,
): Promise<PublishedEventDetails> => {
  const response = await fetch(`${API_PREFIX}/published-events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as PublishedEventDetails;
};

export const purchaseTicket = async (
  accessToken: string,
  eventId: string,
  ticketTypeId: string,
  quantity: number,
): Promise<PurchaseTicketResponse> => {
  const response = await fetch(
    `${API_PREFIX}/events/${eventId}/ticket-types/${ticketTypeId}/tickets?quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as PurchaseTicketResponse;
};

export const confirmPurchase = async (
  accessToken: string,
  eventId: string,
  ticketTypeId: string,
  orderId: string,
  quantity: number,
): Promise<void> => {
  const response = await fetch(
    `${API_PREFIX}/events/${eventId}/ticket-types/${ticketTypeId}/tickets/confirm?orderId=${orderId}&quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listTickets = async (
  accessToken: string,
  page: number,
): Promise<SpringBootPagination<TicketSummary>> => {
  const response = await fetch(`${API_PREFIX}/tickets?page=${page}&size=8`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as SpringBootPagination<TicketSummary>;
};

export const getTicket = async (
  accessToken: string,
  id: string,
): Promise<TicketDetails> => {
  const response = await fetch(`${API_PREFIX}/tickets/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as TicketDetails;
};

export const getTicketQr = async (
  accessToken: string,
  id: string,
): Promise<Blob> => {
  const response = await fetch(`${API_PREFIX}/tickets/${id}/qr-codes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return await response.blob();
  } else {
    throw new Error("Unable to get ticket QR code");
  }
};

export const validateTicket = async (
  accessToken: string,
  request: TicketValidationRequest,
): Promise<TicketValidationResponse> => {
  const response = await fetch(`${API_PREFIX}/ticket-validations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as Promise<TicketValidationResponse>;
};

export const getOrganizerAnalytics = async (
  accessToken: string,
): Promise<OrganizerAnalyticsResponse> => {
  const response = await fetch(`${API_PREFIX}/organizers/analytics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as OrganizerAnalyticsResponse;
};