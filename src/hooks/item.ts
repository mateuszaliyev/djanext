import { useQuery } from "@tanstack/react-query";

import { getItemById, getItems, getItemsByCategory } from "@/api/item";

import type { Category, Item } from "@/types";

export const useItemById = (id: Item["id"]) =>
  useQuery(["item", id], () => getItemById(id));

export const useItems = () => useQuery(["items"], getItems);

export const useItemsByCategory = (id: Category["id"]) =>
  useQuery(["categoryItems", id], () => getItemsByCategory(id));
