"use client";

import React from 'react';
import { Box, Container, Text, VStack, Image, Link, Icon } from '@chakra-ui/react';
import { FaXTwitter } from 'react-icons/fa6';
import NextLink from 'next/link';
import Button from '@/components/Button/Button';

const Footer = () => {
    return (
        <Box 
            bg="#FEF8F3"
            borderTop="1px solid"
            borderColor="rgba(0,0,0,0.1)"
            py={{ base: "50px", md: "55px", lg: "65px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="600px">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
                    <Image 
                        src="/assets/footer/footer-logo.png"
                        alt="Flint"
                        w={{ base: "120px", md: "140px" }}
                        h="auto"
                    />

                    <Text 
                        fontSize={{ base: "16px", md: "18px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="normal"
                        maxW={{ base: "100%", md: "276px" }}
                        w={{ base: "100%", md: "276px" }}
                    >
                        Flint is a community of builders brought together by{' '}
                        <Link 
                            href="https://spiral.xyz" 
                            isExternal
                            textDecoration="underline"
                            color="#767676"
                            _hover={{ opacity: 0.7 }}
                        >
                            Spiral
                        </Link>
                        , a division of Block that supports bitcoin adoption and open source development.
                    </Text>

                    <Button
                        as={NextLink}
                        href="/login"
                        w={{ base: "200px", md: "220px" }}
                        h="48px"
                    >
                        Members Only
                    </Button>

                    <Icon 
                        as={FaXTwitter} 
                        boxSize={{ base: "24px", md: "28px" }}
                        color="black"
                    />

                    <Text 
                        fontSize={{ base: "16px", md: "18px" }}
                        fontWeight="400"
                        color="#767676"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="normal"
                        maxW={{ base: "100%", md: "318px" }}
                        w={{ base: "100%", md: "318px" }}
                    >
                        Code and assets for the Flint site are available on{' '}
                        <Link 
                            href="https://github.com/flintcommunity/FLINT" 
                            isExternal
                            textDecoration="underline"
                            color="#767676"
                            fontFamily="EB Garamond"
                            fontSize={{ base: "16px", md: "18px" }}
                            fontWeight="400"
                            _hover={{ opacity: 0.7 }}
                        >
                            Github
                        </Link>
                        {' '}under an MIT License.
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default Footer;
