import {
    Outlet,
} from "@remix-run/react";
import { Box, Container, HStack } from '@chakra-ui/react'
import Header from "~/components/Header";
import Nav from "~/components/Nav";
import { Category } from "~/types/post_link";

type BaseLayoutProps = {
    categories: Category[];
}

export default function BaseLayout({ categories }: BaseLayoutProps) {
    return (
        <Box>
            <Header />
            <Container maxW="7xl">
                <HStack align="top" wrap={{
                    base: "wrap",
                    lg: "nowrap"
                }}>
                    <Nav categories={categories} />
                    <Outlet />
                </HStack>
            </Container>
        </Box>
    )
}
