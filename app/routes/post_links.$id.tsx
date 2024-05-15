import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import PostLinkForm from "~/components/PostLinkForm";
import { PostLink } from "~/types/post_link";
import * as API from "~/api";

export async function action({
  request
}: ActionFunctionArgs) {
  const body = await request.formData();
  const data = {
    title: body.get('title') as string,
    link: body.get('link') as string,
    categories: JSON.parse(body.get("categories") as string),
    description: body.get('description') as string
  };

  const id = body.get('id') as string;

  await API.updatePostLink(id, data);

  return redirect(`/`);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { charSet: 'utf-8' },
    { title: `Ver Depois | ${data?.title}` },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export async function loader({ params } : LoaderFunctionArgs) {
  const { data } = await API.getPostLink(`${params?.id}`);
  return data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <PostLinkForm postLink={data} />
  );
}
