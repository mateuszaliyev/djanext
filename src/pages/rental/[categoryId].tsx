import type { GetStaticPaths, GetStaticProps } from "next";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getCategories } from "@/api/category";
import { getItemsByCategory } from "@/api/item";

import { LayoutRental } from "@/components/layout";
import { Products } from "@/components/product";

import { useCategories } from "@/hooks/category";
import { useItemsByCategory } from "@/hooks/item";

import type { Category } from "@/types";

export type RentalCategoryProps = {
  categoryId: Category["id"];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();

  return {
    fallback: "blocking",
    paths: categories.map(({ id: categoryId }) => ({
      params: {
        categoryId,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["categories"], getCategories);

  const categoryId = context.params?.categoryId;

  if (typeof categoryId !== "string") {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  await queryClient.prefetchQuery(["categoryItems", categoryId], () =>
    getItemsByCategory(categoryId)
  );

  return {
    props: {
      categoryId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const RentalCategory = ({ categoryId }: RentalCategoryProps) => {
  const { data: categories } = useCategories();
  const { data: items } = useItemsByCategory(categoryId);

  return (
    <LayoutRental
      categories={categories}
      title={categories?.find((category) => category.id === categoryId)?.name}
    >
      <Products items={items} />
    </LayoutRental>
  );
};

export default RentalCategory;
