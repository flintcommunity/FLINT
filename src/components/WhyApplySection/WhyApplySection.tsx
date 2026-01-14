"use client";

import React from 'react';
import { Box, Container, Heading, Text, Image, VStack, Flex } from '@chakra-ui/react';

const WhyApplySection = () => {
    const criteria = [
        {
            title: "You're built to build.",
            description: "You have a track record of creating interesting things, know how to vibe code, and bring a level of experience that will elevate what we make."
        },
        {
            title: "You're curious about bitcoin and AI.",
            description: "You don't need to use them in every project, but their potential draws you to experiment with both."
        },
        {
            title: "You bring good vibes to vibe coding.",
            description: "Positivity and optimism are simply in your nature. You know how to guide people towards better results without cutting them down."
        },
        {
            title: "You love the game.",
            description: "Flint is free to join but offers no financial incentives. We're here to build big things with like-minded creators."
        },
        {
            title: "You have a frontier mentality.",
            description: "Many early prototypes developed by the Flint community will involve using some experimental, low-security, low-privacy software. Fund loss can happen and you're okay with that."
        }
    ];

    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "160px", md: "200px" }}
            pb={{ base: "60px", md: "80px", lg: "100px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
            id="who-should-apply"
            mt={{ base: "-100px", md: "-130px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 10, md: 12, lg: 14 }} align="center">
                    <Image
                        src="/assets/common/section-divider.png"
                        alt="Section divider"
                        w={{ base: "300px", sm: "400px", md: "400px", lg: "500px" }}
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
                        Who should apply.
                    </Heading>

                    <VStack spacing={{ base: 8, md: 10 }} align="stretch" w="100%" maxW="800px">
                        {criteria.map((item, index) => (
                            <Flex
                                key={index}
                                direction="row"
                                align="flex-start"
                                gap={{ base: 4, md: 5 }}
                            >
                                <Image
                                    src="/assets/common/bullet-pointer.png"
                                    alt="Bullet point"
                                    w={{ base: "35px", md: "42px", lg: "49px" }}
                                    h={{ base: "32px", md: "38px", lg: "44px" }}
                                    aspectRatio="49/44"
                                    flexShrink={0}
                                    mt={1}
                                />
                                <Box flex="1" maxW={{ base: "100%", md: "674px" }}>
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="700"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        mb={3}
                                        lineHeight="normal"
                                    >
                                        {item.title}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="400"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="normal"
                                        textAlign="justify"
                                    >
                                        {item.description}
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

export default WhyApplySection;
