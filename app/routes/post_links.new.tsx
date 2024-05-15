import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import PostLinkForm from "~/components/PostLinkForm";
import * as API from "~/api";

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  const data = {
    title: body.get('title') as string,
    link: body.get('link') as string,
    categories: JSON.parse(body.get("categories") as string),
    description: body.get('description') as string
  };
  await API.createPostLink(data);
  return redirect(`/`);
}

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export async function loader() {
  const { data } = await API.getAllPostLinks();
  return data;
}

export default function Index() {
  return (
    <PostLinkForm />
  );
}
