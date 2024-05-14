import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { NavLink } from "@remix-run/react";
import { Category } from '~/types/post_link';


type NavProps = {
    categories: Category[];
}

function Nav({ categories }: NavProps) {
    return (
        <Box p='5'>
            <Box mb="5">
                <Heading size="md">Categorias</Heading>
            </Box>
            {categories?.length ? (
                <>
                <Box mt="2" mb="2">
                    <NavLink to={{
                        search: ""
                    }}>
                        <Button w="100%" colorScheme='teal' variant='outline'>Todas as categorias</Button>
                    </NavLink>
                </Box>
                {categories.map(item => {
                    return (
                        <Box mt="2" mb="2" key={item.name}>
                            <NavLink to={{
                                search: `?category=${item.name}`
                            }}>
                                <Button w="100%" colorScheme='teal' variant='outline'>{item.value}</Button>
                            </NavLink>
                        </Box>
                    )
                })}
            </>
            ) : (
                <Text>Ainda não há categorias</Text>
            )}
        </Box>
    )
}
export default Nav;