import { Link } from "@remix-run/react";
import { HStack, Tag } from '@chakra-ui/react'
import { Category } from "~/types/post_link";

type CategoryTags = {
    categories: Category[];
}

export default function CategoryTags({ categories }: CategoryTags) {
    return (
        <HStack spacing={2} mt="2" wrap="wrap">
            {categories?.map((category) => (
                <Tag size={"md"} key={category.name} as={Link} to={{
                    search: `?category=${encodeURIComponent(category.name)}`
                }} variant='solid' colorScheme='primary'>
                    {category.value}
                </Tag>
            ))}
        </HStack>
    );
}
