import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import PostLinkForm from "~/components/PostLinkForm";
import { PostLink } from "~/types/post_link";

export async function action({
  request
}: ActionFunctionArgs) {
  const body = await request.formData();
  const data = {
    title: body.get('title'),
    link: body.get('link'),
    categories: JSON.parse(body.get("categories") as string),
    description: body.get('description')
  };

  const id = body.get('id');

  console.log(id)

  const response = await fetch(`http://localhost:3000/post_links/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  console.log(response);
  return redirect(`/`);
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params } : LoaderFunctionArgs) {
  const data = await fetch(`http://localhost:3000/post_links/${params.id}`);
  const _items = await data.json();
  return _items;
}

export default function Index() {
  const data = useLoaderData<PostLink>();

  return (
    <PostLinkForm postLink={data} />
  );
}
