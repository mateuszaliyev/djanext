import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/api/category";

export const useCategories = () => useQuery(["categories"], getCategories);
