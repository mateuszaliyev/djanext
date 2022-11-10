import type { GetStaticPaths, GetStaticProps } from "next";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getCategories } from "@/api/category";
import { getItemById } from "@/api/item";

import { LayoutRental } from "@/components/layout";
import { Product } from "@/components/product";

import { useCategories } from "@/hooks/category";
import { useItemById } from "@/hooks/item";

import type { Item } from "@/types";

export type ItemProps = {
  itemId: Item["id"];
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: "blocking",
  paths: [],
});

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["categories"], getCategories);

  const itemId = context.params?.itemId;

  if (typeof itemId !== "string") {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  await queryClient.prefetchQuery(["item", itemId], () => getItemById(itemId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      itemId,
    },
    revalidate: 60,
  };
};

const Item = ({ itemId }: ItemProps) => {
  const { data: categories } = useCategories();
  const { data: item } = useItemById(itemId);

  return (
    <LayoutRental categories={categories} title={item?.name}>
      {item ? <Product item={item} /> : "Nie udało się wczytać produktu..."}
    </LayoutRental>
  );
};

export default Item;
