// import "animate.css/animate.min.css";
import MoveToTopButton from "@/components/common/MoveToTopButton";
import "@/styles/globals.css";
import { queryClientStaleTime } from "@/utils/utils";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      refetchOnReconnect: false,
      retry: 3,
      staleTime: queryClientStaleTime,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <MoveToTopButton />
      </QueryClientProvider>
    </>
  );
}
