"use client";

import React from 'react';
import { Box, Container, Heading, Text, VStack, Image, Flex, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

interface GuidanceItem {
    title: string;
    description: string;
    link?: {
        text: string;
        href: string;
    };
    afterLink?: string;
}

const guidanceItems: GuidanceItem[] = [
    {
        title: "Start small.",
        description: "We should celebrate products that start with a small self-contained idea that is well-executed. From there, big things may come."
    },
    {
        title: "Open source is good.",
        description: "While not strictly required, we encourage Flints to open source their code, assets and prompts. The stuff we build can be a foundation for others to build upon."
    },
    {
        title: "Keep bitcoin and AI top of mind.",
        description: "Again, not strictly required, but building product experiences that use bitcoin or generative AI (possibly together) in interesting & new ways should be on your radar. But non-bitcoin stuff is totally welcome too!"
    },
    {
        title: "Have fun with fun.",
        description: "We are big believer is the power of fun in software. We would love to skew our building towards delightful experiences that spread joy and are kind of infectious to use. The next big mass market success story likely begins life as something really, really fun to use."
    },
    {
        title: "Make it a product.",
        description: "Even if superficially it's just an early prototype for a tiny community of users, spend the time packaging your app a little bit to make it feel like a real product: have a good product name, logo, URL, think about your copy and positioning. Put your good taste on display."
    },
    {
        title: "Pair up.",
        description: "Flint is a community of great people wanting to build together. So, literally, build together. Find and create opportunities to \"pair vibe\" with others—especially when you're stuck, or want to be exposed to new tools and workflows."
    },
    {
        title: "Use mainnet.",
        description: "If you're building with bitcoin, whenever possible, we encourage Flints to build on mainnet (rather than regtest or testnet) as it makes your products, even if early, more \"real\" and easier for others to test with their standard wallets. A consequence of this: we'll always test with small amounts, knowing that fund loss is possible."
    },
    {
        title: "Stay safe.",
        description: "Everything produced by the Flint community will be considered experimental software and should be treated as not very robust, secure or private. We're comfortable with those risks and mitigate them by keeping amounts small and recognizing that fund loss is possible."
    },
    {
        title: "Your apps are yours.",
        description: "Flint takes no responsibility for or claim to ownership of any of the products built by the Flint community. You retain all of your IP."
    },
    {
        title: "Document your stuff.",
        description: "All of the apps you build and put out to the Flint community (we call these Kindling) should be minimally documented with what the app does and how to test it. Make it easy for others to give you the feedback you want."
    },
    {
        title: "Share your ideas.",
        description: "You almost certainly have more ideas that you can build in your lifetime. ",
        link: { text: "Share the ideas", href: "/members/ideas" },
        afterLink: " you think are good but don't think you'll get to; you'll help inspire other builders (we may even publish the list publicly)."
    },
    {
        title: "Share your tools & workflow.",
        description: "We want to make it easy for Flints to find out about the best vibecoding and AI tools that other builders are using. Contribute to our ",
        link: { text: "Resources page", href: "/members/resources" },
        afterLink: " to keep it up to date with the stuff you find most useful."
    }
];

const GuidanceSection = () => {
    return (
        <Box 
            bg="#FEF8F3"
            pt={{ base: "50px", md: "55px", lg: "65px" }}
            pb={{ base: "50px", md: "55px", lg: "65px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
        >
            <Container maxW="1200px">
                <VStack spacing={{ base: 6, md: 6 }} align="center">
                    <Heading
                        as="h2"
                        fontSize={{ base: "36px", sm: "42px", md: "48px", lg: "52px" }}
                        fontWeight="500"
                        color="#000"
                        fontFamily="EB Garamond"
                        textAlign="center"
                        lineHeight="normal"
                    >
                        Some Practical Guidance
                    </Heading>
                    
                    <Image
                        src="/assets/common/section-divider.png"
                        alt="Section divider"
                        w={{ base: "280px", sm: "350px", md: "360px", lg: "420px" }}
                        h="auto"
                    />

                    <VStack spacing={{ base: 8, md: 10 }} align="stretch" w="100%" maxW="800px">
                        {guidanceItems.map((item, index) => (
                            <Flex
                                key={index}
                                direction="row"
                                align="flex-start"
                                gap={{ base: 4, md: 5 }}
                            >
                                <Image
                                    src="/assets/common/bullet-pointer.png"
                                    alt="Bullet point"
                                    w={{ base: "35px", md: "42px", lg: "49px" }}
                                    h={{ base: "32px", md: "38px", lg: "44px" }}
                                    aspectRatio="49/44"
                                    flexShrink={0}
                                    mt={1}
                                />
                                <Box flex="1" maxW={{ base: "100%", md: "674px" }}>
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="700"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        mb={3}
                                        lineHeight="normal"
                                    >
                                        {item.title}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                                        fontWeight="400"
                                        color="#767676"
                                        fontFamily="EB Garamond"
                                        lineHeight="normal"
                                        textAlign="justify"
                                    >
                                        {item.description}
                                        {item.link && (
                                            <>
                                                <Link href={item.link.href} passHref legacyBehavior>
                                                    <ChakraLink
                                                        textDecoration="underline"
                                                        color="#767676"
                                                        _hover={{ opacity: 0.7 }}
                                                    >
                                                        {item.link.text}
                                                    </ChakraLink>
                                                </Link>
                                                {item.afterLink}
                                            </>
                                        )}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default GuidanceSection;
