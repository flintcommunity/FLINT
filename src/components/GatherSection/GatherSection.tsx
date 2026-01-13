"use client";

import React from 'react';
import { Box, Container, Heading, Text, Image, VStack, Flex } from '@chakra-ui/react';

const GatherSection = () => {
    const benefits = [
        {
            title: "Access to others like you.",
            description: "Start your next project already tapped into a community of savvy, like-minded builders. These aren't just test users—they're fellow creators who offer powerful insights and motivating feedback."
        },
        {
            title: "Inspire and be inspired.",
            description: "Nothing inspires creativity like creativity. By trying others users' products, you'll inevitably discover the next thing you want to build."
        },
        {
            title: "Learn a lot.",
            description: "Emerging tech can be hard to keep up with. What are the latest tools? Which are people using? What's best for you? Flint gives you answers."
        },
        {
            title: "Make meaningful connections.",
            description: "You're more likely to meet new friends and colleagues in small, curated communities like ours, some of which could be collaborators for life."
        }
    ];

    return (
        <Box 
            bg="#FEF8F3"
            py={{ base: "60px", md: "80px", lg: "100px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 10, md: 12, lg: 14 }} align="center">
                    <Image
                        src="/assets/GatherSectionImages/Bonefire.png"
                        alt="Bonfire"
                        w={{ base: "180px", sm: "220px", md: "260px", lg: "300px" }}
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
                        Gather round and join Flint.
                    </Heading>

                    <Text
                        fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="1.6"
                        maxW="800px"
                    >
                        It's easier than ever to be a supercharged solo builder, so why do you need Flint?
                    </Text>

                    <VStack spacing={{ base: 8, md: 10 }} align="stretch" w="100%" maxW="900px">
                        {benefits.map((benefit, index) => (
                            <Flex
                                key={index}
                                direction="row"
                                align="flex-start"
                                gap={{ base: 4, md: 5 }}
                            >
                                <Image
                                    src="/assets/CommonImages/BulletPointer.png"
                                    alt="Bullet point"
                                    w={{ base: "24px", md: "28px", lg: "32px" }}
                                    h={{ base: "24px", md: "28px", lg: "32px" }}
                                    flexShrink={0}
                                    mt={1}
                                />
                                <Box flex="1">
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="700"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        mb={2}
                                        lineHeight="normal"
                                    >
                                        {benefit.title}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                                        fontWeight="400"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="1.6"
                                    >
                                        {benefit.description}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default GatherSection;
