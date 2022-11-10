import Link from "next/link";

import { SERVER_URL } from "@/environment";

import type { Item } from "@/types";

export type ProductsProps = {
  items?: Item[];
};

export const Products = ({ items = [] }: ProductsProps) => (
  <div>
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-0 lg:grid-cols-4 lg:gap-x-8">
        {items.map(({ color, id, images, name, price }) => (
          <Link
            className="group relative"
            href={`/rental/item/${id}/`}
            key={id}
          >
            <div className="h-56 w-full overflow-hidden rounded-md border-solid bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={images[0].alt}
                className="h-full w-full object-cover object-center"
                src={`${SERVER_URL}/${images[0].image}`}
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <span className="absolute inset-0" />
              {name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{color}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
