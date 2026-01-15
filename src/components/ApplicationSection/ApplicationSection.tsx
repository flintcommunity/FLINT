"use client";

import React from 'react';
import { Box, Container, Heading, Text, Image, VStack, Grid, GridItem, Button } from '@chakra-ui/react';

const ApplicationSection = () => {
    const requirements = [
        {
            title: "Build regularly.",
            description: "Flint requires its members to build and ship something new every quarter."
        },
        {
            title: "Test regularly.",
            description: "Members are expected to support other members by testing and giving feedback on their projects."
        }
    ];

    const steps = [
        "Fill out the application form",
        "We may reach out to you with some follow-up",
        "Successful applicants will be invited to join the Flint Discord server"
    ];

    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "50px", md: "55px", lg: "65px" }}
            pb={{ base: "50px", md: "55px", lg: "65px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
            id="apply"
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 10, md: 12, lg: 14 }} align="center">
                    <Image
                        src="/assets/application-section/members-order.png"
                        alt="Hammer"
                        w={{ base: "180px", sm: "220px", md: "289px" }}
                        h={{ base: "90px", sm: "110px", md: "145px" }}
                        aspectRatio="289/145"
                    />

                    <Text
                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="left"
                        lineHeight="normal"
                        maxW={{ base: "100%", md: "715px" }}
                        w={{ base: "100%", md: "715px" }}
                    >
                        As with any community, Flint users get out what they put in. In order to make sure users benefit, we created a very short list of membership requirements:
                    </Text>

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap={{ base: 8, md: 10, lg: 12 }}
                        w="100%"
                        maxW={{ base: "100%", md: "715px" }}
                    >
                        {requirements.map((req, index) => (
                            <GridItem key={index}>
                                <VStack align="flex-start" spacing={3}>
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="700"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="normal"
                                        textAlign="left"
                                        maxW={{ base: "100%", md: "307px" }}
                                        w={{ base: "100%", md: "307px" }}
                                    >
                                        {req.title}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="400"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="normal"
                                        textAlign="left"
                                        maxW={{ base: "100%", md: "307px" }}
                                        w={{ base: "100%", md: "307px" }}
                                    >
                                        {req.description}
                                    </Text>
                                </VStack>
                            </GridItem>
                        ))}
                    </Grid>

                    <Button
                        as="a"
                        href="https://tally.so/r/NpXJaW"
                        target="_blank"
                        rel="noopener noreferrer"
                        bg="#FBB420"
                        color="black"
                        w={{ base: "100%", sm: "400px", md: "450px" }}
                        h="58px"
                        fontSize={{ base: "17px", md: "19px", lg: "20px" }}
                        fontWeight="500"
                        borderRadius="0"
                        _hover={{
                            bg: "#E09612"
                        }}
                        transition="all 0.2s"
                    >
                        Apply to join the Flint community
                    </Button>

                    <VStack spacing={4} align="center" w="100%" maxW="700px">
                        <Text
                            fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                            fontWeight="400"
                            color="#767676"
                            fontFamily="EB Garamond"
                            textAlign="left"
                            lineHeight="normal"
                            maxW={{ base: "100%", md: "691px" }}
                            w={{ base: "100%", md: "691px" }}
                        >
                            The process is simple:
                        </Text>

                        <VStack spacing={3} align="center" w="100%">
                            {steps.map((step, index) => (
                                <Text
                                    key={index}
                                    fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                                    fontWeight="400"
                                    color="#767676"
                                    fontFamily="EB Garamond"
                                    lineHeight="1.6"
                                    textAlign="left"
                                    maxW={{ base: "100%", md: "691px" }}
                                    w={{ base: "100%", md: "691px" }}
                                >
                                    {index + 1}. {step}
                                </Text>
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default ApplicationSection;
