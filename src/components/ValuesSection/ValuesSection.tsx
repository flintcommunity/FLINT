"use client";

import React from 'react';
import { Box, Container, Heading, Text, VStack, Image, Flex } from '@chakra-ui/react';

const values = [
    {
        title: "We ship.",
        description: "We express ideas through working prototypes that we rapidly iterate on."
    },
    {
        title: "We craft.",
        description: "We think of product-building as a craft in which taste & design matter."
    },
    {
        title: "We uplift.",
        description: "We use each others' apps, offer encouragement and push for ever better."
    }
];

const ValuesSection = () => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "50px", md: "55px", lg: "65px" }}
            pb={{ base: "50px", md: "55px", lg: "65px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 6, md: 6 }} align="center">
                    <Image
                        src="/assets/common/section-divider.png"
                        alt="Section divider"
                        w={{ base: "280px", sm: "350px", md: "360px", lg: "420px" }}
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
                        Our Values
                    </Heading>

                    <VStack spacing={{ base: 8, md: 10 }} align="stretch" w="100%" maxW="800px">
                        {values.map((value, index) => (
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
                                        {value.title}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="400"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="normal"
                                        textAlign="justify"
                                    >
                                        {value.description}
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

export default ValuesSection;
