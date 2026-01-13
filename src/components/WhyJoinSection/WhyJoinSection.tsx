"use client";

import React from 'react';
import { Box, Container, Heading, Text, Image, VStack } from '@chakra-ui/react';

const WhyJoinSection = () => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "120px", md: "150px" }}
            pb={{ base: "20px", md: "30px", lg: "40px" }}
            px={{ base: "20px", md: "40px" }}
            id="why-join"
            mt={{ base: "-100px", md: "-130px" }}
        >
            <Container maxW="900px">
                <VStack spacing={{ base: 8, md: 10 }} align="center">
                    <Image
                        src="/assets/CommonImages/SectionDivider.png"
                        alt="Section divider"
                        w={{ base: "300px", sm: "400px", md: "500px", lg: "600px" }}
                        h="auto"
                    />

                    <Heading
                        as="h2"
                        fontSize={{ base: "36px", sm: "42px", md: "48px", lg: "52px" }}
                        fontWeight="500"
                        color="#000"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="normal"
                    >
                        Lighting the way with vibes.
                    </Heading>

                    <VStack spacing={{ base: 5, md: 6 }} align="center">
                        <Text
                            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                            fontWeight="400"
                            color="#767676"
                            fontFamily="EB Garamond"
                            textAlign="center"
                            lineHeight="1.6"
                            maxW="800px"
                        >
                            Flint welcomes product builders who push the boundaries of how things are made using vibecoding, bitcoin, AI, and other emerging technologies.
                        </Text>

                        <Text
                            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                            fontWeight="400"
                            color="#767676"
                            fontFamily="EB Garamond"
                            textAlign="center"
                            lineHeight="1.6"
                            maxW="800px"
                        >
                            Our members work with different tools and tech stacks but share a common desire to build better, faster, and brighter. We are one another's first users and champions, showcasing projects we believe will light the way forward for all.
                        </Text>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default WhyJoinSection;
