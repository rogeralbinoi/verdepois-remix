import { Box, Heading, Container, Flex, Spacer, Button } from '@chakra-ui/react'
import { Link } from "@remix-run/react";

function Header() {
    return (
        <Box boxShadow='base' p='6' rounded='md'>
            <Container maxW="7xl">
                <Flex>
                    <Heading as={Link} to="/">
                        Ver depois
                    </Heading>
                    <Spacer />
                    <Button colorScheme="primary" as={Link} to="/post_links/new">Novo</Button>
                </Flex>
            </Container>
        </Box>
    )
}
export default Header;