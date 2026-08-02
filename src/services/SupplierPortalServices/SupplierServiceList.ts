import { apiClient } from "@/lib/apiClient";

export type CatalogWithRateCountItem = {
  id: number;
  service_name: string;
  description: string | null;
  service_type: string;
  city: string | null;
  country: string | null;
  currency: string | null;
  validity: string;
  status: string;
  rates_available: number;
};

export type CatalogWithRateCountParams = {
  token: string;
  page?: number;
  size?: number;
  status?: string;
};

export const supplierServiceList = {
  getCatalogWithRateCount: (
    params: CatalogWithRateCountParams
  ) => {
    const queryParams = new URLSearchParams();

    queryParams.append("token", params.token);
    queryParams.append("page", String(params.page ?? 1));
    queryParams.append("size", String(params.size ?? 20));
    if (params.status) {
      queryParams.append("status", params.status);
    }
    return apiClient<CatalogWithRateCountItem[]>(
      `/supplier/rates/catalogs?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  },
};