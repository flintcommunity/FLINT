"use client";

import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

interface MemberWelcomeProps {
    memberName: string;
    daysActive: number;
    thingsShipped: number;
}

const MemberWelcome = ({ memberName, daysActive, thingsShipped }: MemberWelcomeProps) => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "40px", md: "60px" }}
            pb={{ base: "40px", md: "60px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
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
                        <Box 
                            as="span" 
                            textDecoration="underline"
                            textDecorationColor="#000"
                            textDecorationThickness="2px"
                            textUnderlineOffset="4px"
                        >
                            {memberName}
                        </Box>
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
                        You've been a Member of the Flint community for{' '}
                        <Box as="span" fontWeight="700">
                            {daysActive} days
                        </Box>
                        , and shipped{' '}
                        <Box as="span" fontWeight="700">
                            {thingsShipped} things
                        </Box>
                        . Well done!
                    </Text>

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
