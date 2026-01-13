import React from 'react';
import { Box, Container, Flex, Image, Link as ChakraLink } from '@chakra-ui/react';

const Header = () => {
    return (
        <Box 
            bg="white"
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex="1000"
            px={{ base: "20px", md: "40px", lg: "40px", xl: "60px" }}
        >
            <Container>
                <Flex
                    as="nav"
                    align="center"
                    justify="space-between"
                    wrap="nowrap" 
                    padding={{ base: "1rem 0rem", md: "1.5rem 0rem" }}
                    color="gray.800"
                >
                <Flex align="center">
                    <ChakraLink
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        cursor="pointer"
                        _hover={{ opacity: 0.8 }}
                    >
                        <Image
                            src="/assets/logo.png"
                            alt="Flint Logo"
                            h={{ base: "32px", sm: "36px", md: "50px", lg: "50px", xl: "60px" }}
                            w="auto"
                            fallback={
                              <Box
                                fontSize="2xl"
                                fontWeight="bold"
                                fontFamily="heading"
                                color="flint.600"
                              >
                                🔥 FLINT
                              </Box>
                            }
                        />
                    </ChakraLink>
                </Flex>

                <Flex align="center">
                    <ChakraLink
                        href="#apply"
                        display={{ base: "none", md: "block" }}
                        fontSize={{ base: "14px", md: "16px", lg: "16px", xl: "18px" }}
                        fontWeight="400"
                        color="black"
                        textDecoration="underline"
                        sx={{
                            scrollBehavior: 'smooth'
                        }}
                        _hover={{
                            textDecoration: "none",
                            opacity: 0.8
                        }}
                    >
                        Apply to join
                    </ChakraLink>
                </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
