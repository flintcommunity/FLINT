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
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="900px">
                <VStack spacing={{ base: 8, md: 10 }} align="center">
                    <Image
                        src="/assets/disclaimers-section/pencil-image.png"
                        alt="Pencil"
                        w={{ base: "180px", sm: "220px", md: "280px", lg: "320px" }}
                        h="auto"
                    />

                    <Heading
                        as="h2"
                        fontSize={{ base: "28px", sm: "32px", md: "36px", lg: "40px" }}
                        fontWeight="500"
                        color="#000"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="normal"
                    >
                        Disclaimers
                    </Heading>

                    <VStack spacing={{ base: 5, md: 6 }} align="center" w="100%">
                        {disclaimers.map((disclaimer, index) => (
                            <Text
                                key={index}
                                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                                fontWeight="400"
                                color="#767676"
                                fontFamily="EB Garamond"
                                textAlign="center"
                                lineHeight="1.6"
                                fontStyle="italic"
                                maxW="800px"
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
