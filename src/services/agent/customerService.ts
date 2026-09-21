// src/services/agent/customerService.ts

import { apiClient } from "@/lib/apiClient";

export interface AgentCustomer {
  customer_id: number;
  agent_id: number;
  name: string;
  phone: string | null;
  email: string | null;
  company_name: string | null;
  group_name: string | null;
  created_at: string;
}

export interface CustomerWithGroup {
  customer_id: number;
  customer_name: string;
  phone: string | null;
  email: string | null;
  company_name: string | null;
  group_name: string;
  group_description: string | null;
  group_created_at: string;
  group_id: number;
  customer_created_at: string;
}

export interface CreateCustomerPayload {
  agent_id?: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  company_name?: string | null;
  group_name?: string | null;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const customerService = {
  /**
   * Create a new customer with optional group
   * POST /agent/customers/create?token={token}
   */
  createCustomer: (payload: CreateCustomerPayload): Promise<AgentCustomer> => {
    const token = getToken();
    const cleanPayload: any = {};
    for (const key in payload) {
      if (payload[key as keyof CreateCustomerPayload] !== undefined) {
        cleanPayload[key] = payload[key as keyof CreateCustomerPayload];
      }
    }
    return apiClient(`/agent/customers/create?token=${encodeURIComponent(token)}`, {
      method: "POST",
      body: cleanPayload,
    });
  },

  /**
   * Get all customers for the authenticated agent
   * GET /agent/customers/list?token={token}&limit={limit}
   */
  getCustomers: (limit: number = 100): Promise<AgentCustomer[]> => {
    const token = getToken();
    return apiClient(`/agent/customers/list?token=${encodeURIComponent(token)}&limit=${limit}`, {
      method: "GET",
    });
  },

  /**
   * Get customers by group name
   * GET /agent/customers/group/{group_name}?token={token}
   */
  getCustomersByGroup: (groupName: string): Promise<AgentCustomer[]> => {
    const token = getToken();
    return apiClient(
      `/agent/customers/group/${encodeURIComponent(groupName)}?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    );
  },

  /**
   * Search customers by name or email
   * GET /agent/customers/search?token={token}&query={query}
   */
  searchCustomers: (query: string): Promise<AgentCustomer[]> => {
    const token = getToken();
    return apiClient(
      `/agent/customers/search?token=${encodeURIComponent(token)}&query=${encodeURIComponent(query)}`,
      {
        method: "GET",
      }
    );
  },

  /**
   * Get all customers with groups (for group members table)
   * GET /agent/customers/with-groups?token={token}&search={search}
   */
  getCustomersWithGroups: (search?: string): Promise<CustomerWithGroup[]> => {
    const token = getToken();
    let url = `/agent/customers/with-groups?token=${encodeURIComponent(token)}`;
    if (search && search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }
    return apiClient(url, {
      method: "GET",
    });
  },

  /**
   * Remove a customer from their group (set group_name = NULL)
   * DELETE /agent/customers/{customer_id}/group?token={token}
   */
  removeCustomerFromGroup: (customerId: number): Promise<{ message: string; customer_id: number; group_name: string | null }> => {
    const token = getToken();
    return apiClient(`/agent/customers/${customerId}/group?token=${encodeURIComponent(token)}`, {
      method: "DELETE",
    });
  },
};