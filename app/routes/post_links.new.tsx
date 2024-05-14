import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import PostLinkForm from "~/components/PostLinkForm";

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  const data = {
    title: body.get('title'),
    link: body.get('link'),
    categories: JSON.parse(body.get("categories") as string),
    description: body.get('description')
  };
  const response = await fetch("http://localhost:3000/post_links", {
    method: "POST",
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

export async function loader() {
  const data = await fetch("http://localhost:3000/post_links");
  const _items = await data.json();
  return _items;
}

export default function Index() {
  return (
    <PostLinkForm />
  );
}
