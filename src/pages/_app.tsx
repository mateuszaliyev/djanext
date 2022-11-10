import { useState } from "react";

import type { AppType } from "next/app";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";

const Application: AppType<{ dehydratedState: unknown }> = ({
  Component,
  pageProps,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default Application;
