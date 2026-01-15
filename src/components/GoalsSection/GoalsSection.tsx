"use client";

import React from 'react';
import { Box, Container, Heading, Text, VStack, Image, OrderedList, ListItem } from '@chakra-ui/react';

const goals = [
    "To build compelling products that show what's now possible.",
    "To help and learn from peers; to elevate our game.",
    "To inspire a new generation of builders.",
    "To see new businesses created as a result of our community.",
    "To grow usage of bitcoin in new & interesting ways.",
    "To discover new demand for & gaps in emerging protocols."
];

const GoalsSection = () => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "50px", md: "55px", lg: "65px" }}
            pb={{ base: "50px", md: "55px", lg: "65px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 8, md: 10 }} align="center">
                    <Heading
                        as="h2"
                        fontSize={{ base: "36px", sm: "42px", md: "48px", lg: "52px" }}
                        fontWeight="500"
                        color="#000"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="normal"
                    >
                        Our Goals
                    </Heading>
                    
                    <Image
                        src="/assets/common/section-divider.png"
                        alt="Section divider"
                        w={{ base: "280px", sm: "350px", md: "360px", lg: "420px" }}
                        h="auto"
                    />

                    <OrderedList 
                        spacing={{ base: 4, md: 5 }}
                        w="100%"
                        maxW="800px"
                        styleType="decimal"
                        stylePosition="outside"
                        pl={{ base: 6, md: 8 }}
                    >
                        {goals.map((goal, index) => (
                            <ListItem
                                key={index}
                                fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                fontWeight="700"
                                color="#767676"
                                fontFamily="EB Garamond"
                                lineHeight="normal"
                                maxW={{ base: "100%", md: "674px" }}
                            >
                                {goal}
                            </ListItem>
                        ))}
                    </OrderedList>

                    <VStack spacing={{ base: 6, md: 7 }} align="flex-start" w="100%" maxW="800px" pt={{ base: 4, md: 6 }}>
                        <Text
                            fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                            fontWeight="400"
                            color="#767676"
                            fontFamily="EB Garamond"
                            lineHeight="normal"
                            textAlign="left"
                            w={{ base: "100%", md: "715px" }}
                            maxW="715px"
                        >
                            A prediction we will try to manifest:
                        </Text>

                        <Text
                            fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                            fontWeight="400"
                            color="#767676"
                            fontFamily="EB Garamond"
                            fontStyle="italic"
                            lineHeight="normal"
                            textAlign="left"
                            w={{ base: "100%", md: "715px" }}
                            maxW="715px"
                        >
                            At least one wildly popular app will emerge from—or be inspired by—the Flint community that grows bitcoin usage and pierces the mainstream bubble.
                        </Text>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default GoalsSection;
