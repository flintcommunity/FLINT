"use client";

import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Image, 
  Link as ChakraLink,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box 
            bg="#FEF8F3"
            py={{ base: "20px", md: "30px" }}
            px={{ base: "20px", md: "40px" }}
        >
            <Container maxW="1200px">
                <Flex
                    direction="column"
                    align="center"
                    gap={{ base: 4, md: 6 }}
                >
                    <Flex justify="space-between" align="center" w="100%">
                        <Box flex="1" />
                        <ChakraLink
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            cursor="pointer"
                            _hover={{ opacity: 0.8 }}
                            transition="opacity 0.2s"
                        >
                            <Image
                                src="/assets/logo.png"
                                alt="Flint Logo"
                                h={{ base: "35px", sm: "40px", md: "65px", lg: "70px" }}
                                w="auto"
                            />
                        </ChakraLink>
                        <Flex flex="1" justify="flex-end">
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                icon={<HamburgerIcon w={6} h={6} />}
                                onClick={onOpen}
                                variant="ghost"
                                color="black"
                                bg="transparent"
                                _hover={{ bg: "rgba(0,0,0,0.05)" }}
                                mr={{ base: "-8px", sm: "0" }}
                            />
                        </Flex>
                    </Flex>

                    <Flex 
                        align="center" 
                        gap={{ base: 6, md: 12, lg: 24 }}
                        display={{ base: "none", md: "flex" }}
                    >
                        <ChakraLink
                            href="#why-join"
                            fontSize={{ md: "18px", lg: "20px" }}
                            fontWeight="400"
                            color="black"
                            textDecoration="none"
                            position="relative"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('why-join')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            _hover={{ 
                                _after: {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    bg: '#FBB420'
                                }
                            }}
                            transition="all 0.2s"
                        >
                            Why join
                        </ChakraLink>
                        <ChakraLink
                            href="#who-should-apply"
                            fontSize={{ md: "18px", lg: "20px" }}
                            fontWeight="400"
                            color="black"
                            textDecoration="none"
                            position="relative"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('who-should-apply')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            _hover={{ 
                                _after: {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    bg: '#FBB420'
                                }
                            }}
                            transition="all 0.2s"
                        >
                            Who should apply
                        </ChakraLink>
                        <ChakraLink
                            href="#apply"
                            fontSize={{ md: "18px", lg: "20px" }}
                            fontWeight="400"
                            color="black"
                            textDecoration="none"
                            position="relative"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            _hover={{ 
                                _after: {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    bg: '#FBB420'
                                }
                            }}
                            transition="all 0.2s"
                        >
                            Apply
                        </ChakraLink>
                    </Flex>
                </Flex>

                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent bg="#FEF8F3">
                        <DrawerCloseButton />
                        <DrawerBody pt={20}>
                            <VStack spacing={6} align="stretch">
                                <ChakraLink
                                    href="#why-join"
                                    fontSize="20px"
                                    fontWeight="400"
                                    color="black"
                                    textDecoration="none"
                                    position="relative"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClose();
                                        setTimeout(() => {
                                            document.getElementById('why-join')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    _hover={{ 
                                        _after: {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-4px',
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            bg: '#FBB420'
                                        }
                                    }}
                                    transition="all 0.2s"
                                >
                                    Why join
                                </ChakraLink>
                                <ChakraLink
                                    href="#who-should-apply"
                                    fontSize="20px"
                                    fontWeight="400"
                                    color="black"
                                    textDecoration="none"
                                    position="relative"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClose();
                                        setTimeout(() => {
                                            document.getElementById('who-should-apply')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    _hover={{ 
                                        _after: {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-4px',
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            bg: '#FBB420'
                                        }
                                    }}
                                    transition="all 0.2s"
                                >
                                    Who should apply
                                </ChakraLink>
                                <ChakraLink
                                    href="#apply"
                                    fontSize="20px"
                                    fontWeight="400"
                                    color="black"
                                    textDecoration="none"
                                    position="relative"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClose();
                                        setTimeout(() => {
                                            document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    _hover={{ 
                                        _after: {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-4px',
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            bg: '#FBB420'
                                        }
                                    }}
                                    transition="all 0.2s"
                                >
                                    Apply
                                </ChakraLink>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Container>
        </Box>
    );
};

export default Header;
