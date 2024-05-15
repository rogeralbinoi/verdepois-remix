import { Form } from "@remix-run/react";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  Spacer,
  Divider,
} from '@chakra-ui/react'
import CategoriesInput from "~/components/CategoriesInput";
import { HTMLFormMethod } from "@remix-run/router"
import { PostLink } from "~/types/post_link";

type PostLinkFormProps = {
  postLink?: PostLink | null;
  method?: HTMLFormMethod;
}

function PostLinkForm({
  postLink = null,
  method = "POST"
}: PostLinkFormProps) {
  return (
    <Container
      as={Form}
      boxShadow='base'
      p='6'
      rounded='md'
      maxW="7xl"
      mt="5"
      method={method}
    >
      {postLink?.id ? <Input name="id" value={postLink?.id} type="hidden" /> : null}
      <HStack mb="5">
        <Heading size="md">Novo link</Heading>
        <Spacer />
        <Button type="submit" colorScheme="secondary" color="black">Salvar</Button>
      </HStack>
      <Divider />
      <FormControl mt="5" isRequired>
        <FormLabel>Title</FormLabel>
        <Input name="title" type="text" required defaultValue={postLink?.title} />
      </FormControl>
      <FormControl mt="5" isRequired>
        <FormLabel>Link</FormLabel>
        <Input name="link" type="url" required defaultValue={postLink?.link} placeholder="http://rogeralbino.dev.br" />
      </FormControl>
      <FormControl mt="5">
        <FormLabel>Description</FormLabel>
        <Textarea name="description" defaultValue={postLink?.description} />
      </FormControl>

      <FormControl mt="5">
        <FormLabel>Categorias</FormLabel>
        <CategoriesInput name="categories" defaultValue={postLink?.categories || null} />
      </FormControl>

      <Divider />
      <HStack mt="2">
        <Spacer />
        <Button type="submit" colorScheme="secondary" color="black">Salvar</Button>
      </HStack>
    </Container>
  );
}

export default PostLinkForm;