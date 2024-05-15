import { Form, Link } from "@remix-run/react";
import { Card, CardBody, Heading, Text, CardFooter, Button, CardHeader, HStack, Link as ChakraLink, IconButton, Spacer } from '@chakra-ui/react'
import { PostLink } from "~/types/post_link";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import CategoryTags from "./CategoryTags";

type PostLinkCardProps = {
    postLink: PostLink;
}

export default function PostLinkCard({ postLink }: PostLinkCardProps) {
    return (
        <Card>
            <CardHeader>
                <HStack>
                    <Heading size="md" noOfLines={2}>{postLink?.title}</Heading>
                </HStack>
                <CategoryTags categories={postLink?.categories}/>
            </CardHeader>
            <CardBody>
                <Text noOfLines={3}>{postLink?.description}</Text>
            </CardBody>
            <CardFooter>
                <HStack w="100%">
                    <Form method="DELETE">
                        <IconButton type="submit" name="id" value={postLink?.id} aria-label='Delete Card' size="sm" icon={<DeleteIcon />} />
                    </Form>
                    <IconButton
                        as={Link}
                        to={`/post_links/${postLink?.id}`}
                        aria-label='Edit Card'
                        size="sm"
                        icon={<EditIcon />}
                    />
                    <Spacer />
                    <Button as={ChakraLink} colorScheme='primary' variant='outline' href={postLink?.link} isExternal rightIcon={<ExternalLinkIcon />}>
                        Acessar Link
                    </Button>
                </HStack>

            </CardFooter>
        </Card>
    );
}
