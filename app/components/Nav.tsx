import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react'
import { NavLink, useSearchParams } from "@remix-run/react";
import { useCallback } from 'react';
import { Category } from '~/types/post_link';


type NavProps = {
    categories: Category[];
}

function Nav({ categories }: NavProps) {
    const [params] = useSearchParams();

    const isActive = useCallback((category: string) => {
        return category === params.get('category')
    }, [params]);

    const isAllActive = useCallback(() => {
        return !params.get('category')
    }, [params]);

    return (
        <Box p='5' w="sm">
            <Box mb="5">
                <Heading size="md">Categorias</Heading>
            </Box>
            {categories?.length ? (
                <>
                    <Box mt="2" mb="2">
                        <NavLink to={{
                            search: ""
                        }}>
                            <Button w="100%" colorScheme='primary' variant={isAllActive() ? 'solid' : 'outline'}>Todas as categorias</Button>
                        </NavLink>
                    </Box>
                    <HStack wrap="wrap" gap="2">
                        {categories.map(item => {
                            return (
                                <Box key={item.name}>
                                    <NavLink to={{
                                        search: `?category=${item.name}`
                                    }}>
                                        <Button colorScheme='primary' variant={isActive(item.name) ? 'solid' : 'outline'}>{item.value}</Button>
                                    </NavLink>
                                </Box>
                            )
                        })}
                    </HStack>
                </>
            ) : (
                <Text>Ainda não há categorias</Text>
            )}
        </Box>
    )
}
export default Nav;