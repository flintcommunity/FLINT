"use client";

import React from 'react';
import { Box, Container, Heading, Text, Image, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';

const FirewoodSection = () => {
    return (
        <Box 
            id="firewood"
            bg="#FEF8F3"
            pt={{ base: "50px", md: "55px", lg: "65px" }}
            pb={{ base: "50px", md: "55px", lg: "65px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
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
                        Firewood
                    </Heading>

                    <Image
                        src="/assets/firewood/firewood.png"
                        alt="Firewood"
                        w={{ base: "150px", md: "180px", lg: "200px" }}
                        h="auto"
                    />

                    <Text
                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="justify"
                        lineHeight="normal"
                        w={{ base: "100%", md: "715px" }}
                        maxW="715px"
                    >
                        Firewood is the Flint community's product gallery—apps vibecoded by our members that we think are worthy of some public attention. Apps that might just be the start of something.
                    </Text>

                    <Link href="/firewood" passHref legacyBehavior>
                        <Button
                            as="a"
                            bg="black"
                            color="white"
                            px={{ base: "40px", md: "60px" }}
                            py={{ base: "20px", md: "24px" }}
                            fontSize={{ base: "16px", md: "18px" }}
                            fontFamily="EB Garamond"
                            fontWeight="500"
                            borderRadius="0"
                            _hover={{ bg: "#333" }}
                            mt={{ base: 4, md: 6 }}
                        >
                            Visit Firewood
                        </Button>
                    </Link>
                </VStack>
            </Container>
        </Box>
    );
};

export default FirewoodSection;
