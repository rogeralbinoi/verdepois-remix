import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData, useSearchParams } from "@remix-run/react";
import { Card, CardBody, Heading, Text, Grid, GridItem, Container, CardFooter, Button, CardHeader, HStack, Tag, Link as ChakraLink, IconButton, Spacer } from '@chakra-ui/react'
import { PostLink } from "~/types/post_link";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useMemo } from "react";
import * as API from "~/api";

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
    <Container maxW="7xl" mt="5">
      <Grid templateColumns={
        {
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          base: '1fr'
        }
      } gap={6}>
        {
          filteredPosts?.map(item => <GridItem w='100%' maxW="300px" key={item.id}>
            <Card>
              <CardHeader>
                <HStack>
                  <Heading size="md" noOfLines={2}>{item.title}</Heading>
                </HStack>
                <HStack spacing={2} mt="2" wrap="wrap">
                  {item?.categories?.map((category) => (
                    <Tag size={"md"} key={category.name} as={Link} to={{
                      search: `?category=${encodeURIComponent(category.name)}`
                    }} variant='solid' colorScheme='primary'>
                      {category.value}
                    </Tag>
                  ))}
                </HStack>
              </CardHeader>
              <CardBody>
                <Text noOfLines={3}>{item.description}</Text>
              </CardBody>
              <CardFooter>
                <HStack w="100%">
                  <Form method="DELETE">
                    <IconButton type="submit" name="id" value={item.id} aria-label='Delete Card' size="sm" icon={<DeleteIcon />} />
                  </Form>
                  <IconButton
                    as={Link}
                    to={`/post_links/${item.id}`}
                    aria-label='Edit Card'
                    size="sm"
                    icon={<EditIcon />}
                  />
                  <Spacer />
                  <Button as={ChakraLink} colorScheme='primary' variant='outline' href={item.link} isExternal  rightIcon={<ExternalLinkIcon />}>
                    Acessar Link
                  </Button>
                </HStack>

              </CardFooter>
            </Card>
          </GridItem>)
        }
      </Grid>
    </Container>
  );
}
