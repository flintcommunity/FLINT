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
            pt={{ base: "160px", md: "200px" }}
            pb={{ base: "60px", md: "80px", lg: "100px" }}
            px={{ base: "20px", md: "40px" }}
            id="apply"
            mt={{ base: "-100px", md: "-130px" }}
        >
            <Container maxW="1100px">
                <VStack spacing={{ base: 10, md: 12, lg: 14 }} align="center">
                    <Image
                        src="/assets/ApplicationSectionImages/MembersOrder.png"
                        alt="Hammer"
                        w={{ base: "200px", sm: "250px", md: "350px", lg: "450px", xl: "500px" }}
                        h="auto"
                    />

                    <Text
                        fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="1.6"
                        maxW="800px"
                    >
                        As with any community, Flint users get out what they put in. In order to make sure users benefit, we created a very short list of membership requirements:
                    </Text>

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap={{ base: 8, md: 10, lg: 12 }}
                        w="100%"
                        maxW="900px"
                    >
                        {requirements.map((req, index) => (
                            <GridItem key={index}>
                                <VStack align={{ base: "center", md: "flex-start" }} spacing={3}>
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "22px", md: "24px", lg: "26px" }}
                                        fontWeight="700"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="normal"
                                        textAlign={{ base: "center", md: "left" }}
                                    >
                                        {req.title}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                                        fontWeight="400"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="1.6"
                                        textAlign={{ base: "center", md: "left" }}
                                    >
                                        {req.description}
                                    </Text>
                                </VStack>
                            </GridItem>
                        ))}
                    </Grid>

                    <Button
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
                            fontSize={{ base: "18px", md: "20px", lg: "22px" }}
                            fontWeight="500"
                            color="#767676"
                            fontFamily="EB Garamond"
                            textAlign="center"
                        >
                            The process is simple:
                        </Text>

                        <VStack spacing={3} align="flex-start" w="100%">
                            {steps.map((step, index) => (
                                <Text
                                    key={index}
                                    fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                                    fontWeight="400"
                                    color="#767676"
                                    fontFamily="EB Garamond"
                                    lineHeight="1.6"
                                    textAlign="left"
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
