import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import React, { useContext, useEffect, useMemo } from 'react'
import { withEmotionCache } from '@emotion/react'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { theme } from "./theme";

import { MetaFunction, LinksFunction, LoaderFunctionArgs, redirect } from '@remix-run/node'

import { ServerStyleContext, ClientStyleContext } from './context'
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Category, PostLink } from "./types/post_link";

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: 'New Remix App' },
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

function uniqueBy<T>(fieldName: keyof T, array: T[]): T[] {
  const uniqueMap = new Map<T[K], boolean>();
  const uniqueArray: T[] = [];

  array.forEach(item => {
    const key = item[fieldName];
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, true);
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
}

export async function loader( { request } : LoaderFunctionArgs) {
  const data = await fetch("http://localhost:3000/post_links");
  const _items: PostLink[] = await data.json();
  const nameField: keyof Category = "name";

  const url = new URL(request.url);
  const categoryFilter = url.searchParams.get("category");



  const _categories = uniqueBy<Category>(nameField, _items.map(item => item.categories).flat(Infinity) as Category[]);
  const categoryFilterExists = _categories.some(item => item.name === categoryFilter);

  if (categoryFilter && !categoryFilterExists) {
    return redirect('/');
  }
  return _categories;
}

export const Layout = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    useEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData?.reset();
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
  const categories = useLoaderData<Category[]>();
  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateAreas={{
          lg: `"header header"
          "nav main"
          "nav footer"`,
          base: `"header header"
          "nav nav"
          "main main"
          "footer footer"`
        }}
        gridTemplateRows={{
          lg: 'auto 1fr 30px',
          base: 'auto auto auto'
        }}
        gridTemplateColumns={{
          lg: '350px 1fr',
          base: '1fr'
        }}
        h='100vh'
        gap='1'
      >
        <GridItem area={'header'}>
          <Header />
        </GridItem>
        <GridItem area={'nav'}>
          <Nav categories={categories} />
        </GridItem>
        <GridItem area={'main'}>
          <Outlet />
        </GridItem>
        <GridItem area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </ChakraProvider>
  )
}
