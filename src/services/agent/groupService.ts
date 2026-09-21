// src/services/agent/groupService.ts

import { apiClient } from "@/lib/apiClient";

export interface AgentGroup {
  group_id: number;
  agent_id: number;
  group_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CreateGroupPayload {
  group_name: string;
  description?: string;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const groupService = {
  /**
   * Create a new group
   * POST /agent/groups/create?token={token}
   */
  createGroup: (payload: CreateGroupPayload): Promise<AgentGroup> => {
    const token = getToken();
    return apiClient(`/agent/groups/create?token=${encodeURIComponent(token)}`, {
      method: "POST",
      body: payload,
    });
  },

  /**
   * Get all groups for the authenticated agent
   * GET /agent/groups/list?token={token}&limit={limit}
   */
  getGroups: (limit: number = 100): Promise<AgentGroup[]> => {
    const token = getToken();
    return apiClient(`/agent/groups/list?token=${encodeURIComponent(token)}&limit=${limit}`, {
      method: "GET",
    });
  },

  /**
   * Search groups by name (autocomplete)
   * GET /agent/groups/search?token={token}&query={query}&limit={limit}
   */
  searchGroups: (query: string, limit: number = 10): Promise<AgentGroup[]> => {
    const token = getToken();
    return apiClient(
      `/agent/groups/search?token=${encodeURIComponent(token)}&query=${encodeURIComponent(query)}&limit=${limit}`,
      {
        method: "GET",
      }
    );
  },

  /**
   * Get a specific group by ID
   * GET /agent/groups/{group_id}?token={token}
   */
  getGroup: (groupId: number): Promise<AgentGroup> => {
    const token = getToken();
    return apiClient(`/agent/groups/${groupId}?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * Update a group
   * PUT /agent/groups/{group_id}?token={token}
   */
  updateGroup: (groupId: number, payload: CreateGroupPayload): Promise<AgentGroup> => {
    const token = getToken();
    return apiClient(`/agent/groups/${groupId}?token=${encodeURIComponent(token)}`, {
      method: "PUT",
      body: payload,
    });
  },

  /**
   * Delete a group (soft delete)
   * DELETE /agent/groups/{group_id}?token={token}
   */
  deleteGroup: (groupId: number): Promise<{ message: string; group_id: number }> => {
    const token = getToken();
    return apiClient(`/agent/groups/${groupId}?token=${encodeURIComponent(token)}`, {
      method: "DELETE",
    });
  },
};