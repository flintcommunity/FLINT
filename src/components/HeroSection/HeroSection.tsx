"use client";

import React from 'react';
import { Box, Container, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';

const HeroSection = () => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "40px", md: "35px" }}
            pb={{ base: "50px", md: "40px", lg: "45px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
        >
            <Container maxW="1400px">
                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    justify="center"
                    gap={{ base: 8, md: 16, lg: 20 }}
                >
                    <Box 
                        flex="0 0 auto"
                        display="flex"
                        justifyContent="center"
                        order={{ base: 0, md: 0 }}
                        mb={{ base: 6, md: 0 }}
                    >
                        <Image
                            src="/assets/hero/hero-image.png"
                            alt="Flint and steel creating sparks"
                            w={{ base: "280px", sm: "340px", md: "550px", lg: "650px", xl: "700px" }}
                            h="auto"
                        />
                    </Box>

                    <Flex
                        flex="0 0 auto"
                        direction="column"
                        align="center"
                        textAlign="center"
                        order={{ base: 1, md: 1 }}
                        maxW={{ base: "100%", md: "600px" }}
                        sx={{
                            '@media (min-width: 768px)': {
                                alignItems: 'flex-start',
                                textAlign: 'left'
                            }
                        }}
                    >
                        <Heading
                            as="h1"
                            fontSize={{ base: "40px", sm: "48px", md: "64px" }}
                            fontWeight="500"
                            color="#000"
                            fontFamily="EB Garamond"
                            mb={{ base: 4, md: 6 }}
                            lineHeight="normal"
                        >
                            Spark something.
                        </Heading>

                        <Text
                            fontSize={{ base: "22px", sm: "24px", md: "28px" }}
                            fontWeight="400"
                            color="#767676"
                            fontFamily="EB Garamond"
                            mb={{ base: 6, md: 10 }}
                            lineHeight="normal"
                            maxW={{ base: "100%", md: "470px" }}
                        >
                            Flint is a community of vibecoders using new tech to build the next tech.
                        </Text>

                        <Button
                            as="a"
                            href="#apply"
                            bg="#FBB420"
                            color="#000"
                            fontSize="18px"
                            fontWeight="500"
                            fontFamily="EB Garamond"
                            w={{ base: "240px", sm: "280px", md: "367px" }}
                            h="58px"
                            borderRadius="0"
                            lineHeight="normal"
                            _hover={{
                                bg: "#E09612"
                            }}
                            transition="all 0.2s"
                        >
                            Apply to join
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default HeroSection;
