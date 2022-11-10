import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getCategories } from "@/api/category";
import { getItems } from "@/api/item";

import { LayoutRental } from "@/components/layout";
import { Products } from "@/components/product";

import { useCategories } from "@/hooks/category";
import { useItems } from "@/hooks/item";

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["categories"], getCategories);
  await queryClient.prefetchQuery(["items"], getItems);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Rental = () => {
  const { data: categories } = useCategories();
  const { data: items } = useItems();

  return (
    <LayoutRental categories={categories} title="Wypożyczalnia">
      <Products items={items} />
    </LayoutRental>
  );
};

export default Rental;
