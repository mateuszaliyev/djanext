import { API_URL } from "@/environment";

import type { Category, Item } from "@/types";

const headers = {
  "Content-Type": "application/json",
};

export const getItemById = async (id: Item["id"]) => {
  const response = await fetch(`${API_URL}/item/${id}/`, {
    headers,
  });

  return (await response.json()) as Item;
};

export const getItems = async () => {
  const response = await fetch(`${API_URL}/item/`, {
    headers,
  });

  return (await response.json()) as Item[];
};

export const getItemsByCategory = async (id: Category["id"]) => {
  const response = await fetch(`${API_URL}/categoryitems/${id}/`, {
    headers,
  });

  return (await response.json()) as Item[];
};
