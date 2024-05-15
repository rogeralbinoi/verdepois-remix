import {
  Links,
  Meta,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./theme";
import * as API from "~/api";

import { MetaFunction, LinksFunction, LoaderFunctionArgs, redirect } from '@remix-run/node'

import { ServerStyleContext, ClientStyleContext } from './context'
import { Category } from "./types/post_link";
import { uniqueBy } from "./utils/uniqueBy";
import BaseLayout from "./components/BaseLayout";

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: 'Teste' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
    },
  ]
}

interface DocumentProps {
  children: React.ReactNode;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { data } = await API.getAllPostLinks();

  const url = new URL(request.url);
  const categoryFilter = url.searchParams.get("category");



  const _categories = uniqueBy<Category>("name", data.map(item => item.categories).flat(Infinity) as Category[]);
  const categoryFilterExists = _categories.some(item => item.name === categoryFilter);

  if (categoryFilter && !categoryFilterExists) {
    return redirect('/');
  }
  return _categories;
}

type emotionCacheSheet = {
  _insertTag: (tag: HTMLStyleElement) => void;
}

export const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    useEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as unknown as emotionCacheSheet)._insertTag(tag);
      });
      clientStyleData?.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  const categories = useLoaderData<typeof loader>();

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <BaseLayout categories={categories}/>
      </ChakraProvider>
    </Document>
  )
}
