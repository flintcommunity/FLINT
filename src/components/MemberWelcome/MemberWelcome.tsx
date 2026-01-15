"use client";

import React from 'react';
import { Box, Container, Heading, Text, VStack, Link as ChakraLink, Spinner } from '@chakra-ui/react';
import Link from 'next/link';

interface MemberWelcomeProps {
    memberName: string | null;
    daysActive: number;
    isLoading?: boolean;
}

const MemberWelcome = ({ memberName, daysActive, isLoading = false }: MemberWelcomeProps) => {
    const getMembershipMessage = () => {
        if (daysActive === 0) {
            return "You just joined the Flint community today.";
        }
        return (
            <>
                You've been a member of the Flint community for{' '}
                <Box as="span" fontWeight="700">
                    {daysActive} {daysActive === 1 ? 'day' : 'days'}
                </Box>
                .
            </>
        );
    };

    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "40px", md: "60px" }}
            pb={{ base: "40px", md: "60px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
                    {isLoading ? (
                        <Box py={{ base: "20px", md: "40px" }}>
                            <Spinner size="xl" color="#FBB420" thickness="3px" />
                        </Box>
                    ) : (
                        <>
                            <Heading
                                as="h1"
                                fontSize={{ base: "40px", sm: "48px", md: "64px", lg: "72px" }}
                                fontWeight="500"
                                color="#000"
                                fontFamily="EB Garamond"
                                lineHeight="normal"
                                textAlign="center"
                            >
                                Here's your Field Guide,{' '}
                                <Link href="/profile" passHref legacyBehavior>
                                    <ChakraLink
                                        textDecoration="underline"
                                        textDecorationColor="#000"
                                        textDecorationThickness="2px"
                                        textUnderlineOffset="4px"
                                        _hover={{ textDecorationColor: "#FBB420" }}
                                        transition="all 0.2s"
                                    >
                                        {memberName}
                                    </ChakraLink>
                                </Link>
                                .
                            </Heading>

                            <Text
                                fontSize={{ base: "20px", md: "24px", lg: "28px" }}
                                fontWeight="400"
                                color="#767676"
                                fontFamily="EB Garamond"
                                lineHeight="normal"
                                textAlign="center"
                            >
                                {getMembershipMessage()}
                            </Text>
                        </>
                    )}

                    <Text
                        fontSize={{ base: "20px", md: "24px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        lineHeight="normal"
                        textAlign="center"
                        maxW="900px"
                    >
                        Below is the{' '}
                        <Box as="span" fontWeight="700">
                            Flint Field Guide
                        </Box>
                        —our handbook that reminds us who we are, what we do and how we do it.
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default MemberWelcome;
