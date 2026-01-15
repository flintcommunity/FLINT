"use client";

import React from 'react';
import { Box, Container, Heading, Text, VStack, Image } from '@chakra-ui/react';

const progressionSteps = [
    {
        title: "Step 1 - Kindling (Private Alpha)",
        description: "Flints start by building interesting apps and shipping them internally within the Flint community for feedback and testing. These apps will be considered early-stage and experimental—generally low-security, low-privacy and buggy. But they should still evince good taste and good ideas, worthy of Flints' attention."
    },
    {
        title: "Step 2 - Firewood (Public Beta)",
        description: "Based on votes by the Flint community (starting apps that are particularly awesome) the most noteworthy products will graduate to a public Flint app directory we'll call Firewood. This is where public users will be able to discover and try prototype apps from the Flint community (with the proper caveats around early stage and associated risks)"
    },
    {
        title: "Step 3 - Blaze (Real products)",
        description: "A small number of the Firewood products put out by the Flint community will (hopefully) be so good, so promising that people will take the baton to transform a great prototype app into a productionized, high-security and real paid service—sometimes with company and associated business model. Flints may carry this torch themselves, or other entrepreneurs who find these products and are inspired to take up the charge."
    }
];

const ProductProgressionSection = () => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "50px", md: "55px", lg: "65px" }}
            pb={{ base: "70px", md: "80px", lg: "95px" }}
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
                        Product Progression
                    </Heading>
                    
                    <Image
                        src="/assets/common/section-divider.png"
                        alt="Section divider"
                        w={{ base: "280px", sm: "350px", md: "360px", lg: "420px" }}
                        h="auto"
                    />

                    <VStack spacing={{ base: 10, md: 12 }} align="center" w="100%" maxW="800px">
                        {progressionSteps.map((step, index) => (
                            <VStack key={index} spacing={{ base: 4, md: 5 }} align="center" w="100%">
                                <Text
                                    fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                    fontWeight="700"
                                    color="#767676"
                                    fontFamily="EB Garamond"
                                    lineHeight="normal"
                                    textAlign="center"
                                    maxW={{ base: "100%", md: "674px" }}
                                >
                                    {step.title}
                                </Text>
                                
                                <Text
                                    fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                    fontWeight="400"
                                    color="#767676"
                                    fontFamily="EB Garamond"
                                    lineHeight="normal"
                                    textAlign="center"
                                    maxW={{ base: "100%", md: "674px" }}
                                >
                                    {step.description}
                                </Text>

                                {index < progressionSteps.length - 1 && (
                                    <Text
                                        fontSize={{ base: "48px", md: "56px", lg: "64px" }}
                                        color="#767676"
                                        mt={{ base: 4, md: 6 }}
                                        mb={{ base: 2, md: 4 }}
                                    >
                                        ↓
                                    </Text>
                                )}
                            </VStack>
                        ))}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default ProductProgressionSection;
