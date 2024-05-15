import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useLoaderData, useSearchParams } from "@remix-run/react";
import { PostLink } from "~/types/post_link";
import { useMemo } from "react";
import * as API from "~/api";
import PostLinkList from "~/components/PostLinkList";
import { Box } from "@chakra-ui/react";

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: `Home - Ver Depois` },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export async function loader() {
  const { data } = await API.getAllPostLinks();
  return data;
}

export async function action({
  request
}: ActionFunctionArgs) {
  if (request.method !== "DELETE") {
    return redirect("/")
  }

  const body = await request.formData();
  const id = body.get('id') as string;

  await API.deletePostLink(id);

  return redirect(`/`);
}

export default function Index() {
  const data: PostLink[] = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  const filteredPosts = useMemo<PostLink[]>(() => {
    const categoryFilter = params.get('category');
    if (!categoryFilter) return data;
    return data.filter(item => item?.categories?.find(item => item.name === categoryFilter))
  }, [params, data]);

  return (
    <Box mt="5" flex="1">
      <PostLinkList postLinks={filteredPosts}/>
    </Box>
  );
}
