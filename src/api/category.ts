import { API_URL } from "@/environment";

import type { Category } from "@/types";

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await response.json()) as Category[];
};
