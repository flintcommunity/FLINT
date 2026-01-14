"use client";

import React from 'react';
import { Box, Container, Heading, Text, Image, VStack } from '@chakra-ui/react';

const DisclaimersSection = () => {
    const disclaimers = [
        "Flint takes no responsibility for or claim to ownership of any of the products built by the Flint community.",
        "Flint members retain 100% of the IP rights to what they build.",
        "We encourage Flint members to open-source their projects—prompts, code, assets—but this is not required."
    ];

    return (
        <Box 
            bg="#FEF8F3"
            py={{ base: "60px", md: "80px", lg: "100px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 8, md: 10 }} align="center">
                    <Image
                        src="/assets/disclaimers-section/pencil-image.png"
                        alt="Pencil"
                        w={{ base: "180px", sm: "220px", md: "280px", lg: "320px" }}
                        h="auto"
                    />

                    <Heading
                        as="h2"
                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                        fontWeight="700"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="left"
                        lineHeight="normal"
                        maxW={{ base: "100%", md: "728px" }}
                        w={{ base: "100%", md: "728px" }}
                    >
                        Disclaimers
                    </Heading>

                    <VStack spacing={{ base: 5, md: 6 }} align="center" w="100%">
                        {disclaimers.map((disclaimer, index) => (
                            <Text
                                key={index}
                                fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                fontWeight="400"
                                color="#767676"
                                fontFamily="EB Garamond"
                                textAlign="left"
                                lineHeight="normal"
                                fontStyle="italic"
                                maxW={{ base: "100%", md: "728px" }}
                                w={{ base: "100%", md: "728px" }}
                            >
                                {disclaimer}
                            </Text>
                        ))}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default DisclaimersSection;
