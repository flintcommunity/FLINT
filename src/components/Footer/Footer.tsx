"use client";

import React from 'react';
import { Box, Container, Text, VStack, Image, Link, Icon, Button } from '@chakra-ui/react';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <Box 
            bg="#FEF8F3"
            borderTop="1px solid"
            borderColor="rgba(0,0,0,0.1)"
            py={{ base: "60px", md: "80px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="600px">
                <VStack spacing={{ base: 6, md: 8 }} align="center">
                    <Image 
                        src="/assets/FooterSectionImages/footerLogo.png"
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
                        lineHeight="1.6"
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
                        bg="#FBB420"
                        color="black"
                        w={{ base: "200px", md: "220px" }}
                        h="48px"
                        fontSize={{ base: "16px", md: "18px" }}
                        fontWeight="500"
                        fontFamily="EB Garamond"
                        borderRadius="0"
                        _hover={{
                            bg: "#E09612"
                        }}
                        transition="all 0.2s"
                    >
                        Members Only
                    </Button>

                    <Link 
                        href="https://x.com/flint" 
                        isExternal
                        _hover={{ opacity: 0.7 }}
                        transition="opacity 0.2s"
                    >
                        <Icon 
                            as={FaXTwitter} 
                            boxSize={{ base: "24px", md: "28px" }}
                            color="black"
                        />
                    </Link>
                </VStack>
            </Container>
        </Box>
    );
};

export default Footer;
