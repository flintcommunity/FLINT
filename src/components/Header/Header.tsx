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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
    scrollTo?: string;
}

interface HeaderProps {
    navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
    { label: "Why join", href: "#why-join", scrollTo: "why-join" },
    { label: "Who should apply", href: "#who-should-apply", scrollTo: "who-should-apply" },
    { label: "Apply", href: "#apply", scrollTo: "apply" },
    { label: "Firewood", href: "/firewood" }
];

const Header = ({ navItems = defaultNavItems }: HeaderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathname = usePathname();

    const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
        if (item.scrollTo) {
            e.preventDefault();
            const element = document.getElementById(item.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleMobileNavClick = (e: React.MouseEvent, item: NavItem) => {
        if (item.scrollTo) {
            e.preventDefault();
            onClose();
            setTimeout(() => {
                if (item.scrollTo) {
                    const element = document.getElementById(item.scrollTo);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 100);
        } else {
            onClose();
        }
    };

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
                        <Link href="/" passHref legacyBehavior>
                            <ChakraLink
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
                        </Link>
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
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return item.isExternal ? (
                                <ChakraLink
                                    key={index}
                                    href={item.href}
                                    isExternal
                                    fontSize={{ md: "18px", lg: "20px" }}
                                    fontWeight="400"
                                    color="black"
                                    textDecoration="none"
                                    position="relative"
                                    _after={isActive ? {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-4px',
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        bg: '#FBB420'
                                    } : undefined}
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
                                    {item.label}
                                </ChakraLink>
                            ) : (
                                <Link key={index} href={item.href} passHref legacyBehavior>
                                    <ChakraLink
                                        fontSize={{ md: "18px", lg: "20px" }}
                                        fontWeight="400"
                                        color="black"
                                        textDecoration="none"
                                        position="relative"
                                        onClick={(e) => handleNavClick(e, item)}
                                        _after={isActive ? {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-4px',
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            bg: '#FBB420'
                                        } : undefined}
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
                                        {item.label}
                                    </ChakraLink>
                                </Link>
                            );
                        })}
                    </Flex>
                </Flex>

                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent bg="#FEF8F3">
                        <DrawerCloseButton />
                        <DrawerBody pt={20}>
                            <VStack spacing={6} align="stretch">
                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.href;
                                    return item.isExternal ? (
                                        <ChakraLink
                                            key={index}
                                            href={item.href}
                                            isExternal
                                            fontSize="20px"
                                            fontWeight="400"
                                            color="black"
                                            textDecoration="none"
                                            position="relative"
                                            onClick={() => onClose()}
                                            _after={isActive ? {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '-4px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                bg: '#FBB420'
                                            } : undefined}
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
                                            {item.label}
                                        </ChakraLink>
                                    ) : (
                                        <Link key={index} href={item.href} passHref legacyBehavior>
                                            <ChakraLink
                                                fontSize="20px"
                                                fontWeight="400"
                                                color="black"
                                                textDecoration="none"
                                                position="relative"
                                                onClick={(e) => handleMobileNavClick(e, item)}
                                                _after={isActive ? {
                                                    content: '""',
                                                    position: 'absolute',
                                                    bottom: '-4px',
                                                    left: 0,
                                                    right: 0,
                                                    height: '2px',
                                                    bg: '#FBB420'
                                                } : undefined}
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
                                                {item.label}
                                            </ChakraLink>
                                        </Link>
                                    );
                                })}
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Container>
        </Box>
    );
};

export default Header;
