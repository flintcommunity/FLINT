"use client";

import React from 'react';
import { Box, Container, Text, Flex, Image, Link, Icon } from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <Box 
            bg="#F5F5F5" 
            py={{ base: "40px", md: "60px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
        >
            <Container>
                <Flex 
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "flex-start", md: "flex-start" }}
                    gap={{ base: "30px", md: "40px" }}
                >
                    <Box maxW={{ base: "100%", md: "400px" }}>
                        <Flex align="center" mb={8}>
                            <Image 
                                src="/assets/logo.png"
                                alt="Flint"
                                width="200px"
                                fallback={
                                  <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
                                    🔥 FLINT
                                  </Text>
                                }
                            />
                        </Flex>

                        <Text 
                            fontSize={{ base: "14px", md: "15px" }}
                            lineHeight="1.4"
                            mb={4}
                            color="black"
                        >
                            Flint is a community of vibecoders using new tech to build the next tech.
                        </Text>

                        <Text 
                            fontSize={{ base: "14px", md: "15px" }}
                            lineHeight="1.4"
                            color="black"
                        >
                            Our members work with different tools and technologies, showcasing projects that help grow bitcoin and open source ecosystems.
                        </Text>
                        <Box mt={8}>
                        <Flex gap={4} align="center">
                            <Link 
                                href="https://x.com/flint" 
                                isExternal
                                _hover={{ opacity: 0.7 }}
                                transition="opacity 0.2s"
                            >
                                <Icon 
                                    as={FaXTwitter} 
                                    boxSize={{ base: "32px", md: "36px" }}
                                    color="black"
                                />
                            </Link>

                            <Link 
                                href="https://github.com/flint" 
                                isExternal
                                _hover={{ opacity: 0.7 }}
                                transition="opacity 0.2s"
                            >
                                <Icon 
                                    as={FaGithub} 
                                    boxSize={{ base: "32px", md: "36px" }}
                                    color="black"
                                />
                            </Link>

                            <Link 
                                href="https://discord.gg/flint" 
                                isExternal
                                _hover={{ opacity: 0.7 }}
                                transition="opacity 0.2s"
                            >
                                <Icon 
                                    as={FaDiscord} 
                                    boxSize={{ base: "32px", md: "36px" }}
                                    color="black"
                                />
                            </Link>
                        </Flex>
                    </Box>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;
