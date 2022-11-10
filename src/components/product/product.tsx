import { Disclosure, Tab } from "@headlessui/react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { clsx } from "clsx";

import { SERVER_URL } from "@/environment";

import type { Item } from "@/types";

export type ProductProps = {
  item: Item;
};

export const Product = ({ item }: ProductProps) => {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {item.images.map(({ alt, id, image, name }) => (
                  <Tab
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    key={id}
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{name}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={alt}
                            className="h-full w-full object-cover object-center"
                            src={`${SERVER_URL}/${image}`}
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className={clsx(
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                            selected ? "ring-indigo-500" : "ring-transparent"
                          )}
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {item.images.map(({ alt, id, image }) => (
                <Tab.Panel key={id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={alt}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                    src={`${SERVER_URL}/${image}`}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {item.name}
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Informacje o produkcie</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {item.price.toFixed(2)} zł
              </p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Opis</h3>
              <div className="space-y-6 text-base text-gray-700">
                {item.description}
              </div>
            </div>
            <form className="mt-6">
              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Wypożycz
                </button>
              </div>
            </form>
            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Dodatkowe informacje
              </h2>
              <div className="divide-y divide-gray-200 border-t">
                {item.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={clsx(
                                "text-sm font-medium",
                                open ? "text-indigo-600" : "text-gray-900"
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
