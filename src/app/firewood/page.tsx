"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, VStack, Text, Image, Heading, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FirewoodAppCard from "@/components/FirewoodAppCard/FirewoodAppCard";

const membersNavItems = [
  { label: "Field Guide", href: "/members/field-guide" },
  { label: "Resources", href: "/members/resources" },
  { label: "Ideas", href: "/members/ideas" },
  { label: "Kindling", href: "/members/kindling" },
  { label: "Firewood", href: "/firewood" }
];

interface FirewoodApp {
  id: number;
  name: string;
  logoUrl: string | null;
  description: string;
  appUrl: string;
  platforms: string;
}

const firewoodApps: FirewoodApp[] = [
  {
    id: 0,
    name: "Abendrot",
    logoUrl: "https://abendrot.app/icon-256.png",
    description: "A free, open-source macOS menu-bar app that warms built-in and external displays around local sunset, with a Reveal True Color shortcut and no telemetry.",
    appUrl: "https://abendrot.app/",
    platforms: "MacOS",
  },
  {
    id: 5,
    name: "The Shed",
    logoUrl: "https://flints.dev/api/objects/uploads/84e38aa0-fc8f-4f53-908e-55d4a8ab06fc",
    description: "A jazz piano practice app that connects to your MIDI keyboard. Work through 20 training modes covering intervals, chords, voicings, and progressions — from basics to advanced concepts like upper structure triads and voice leading. Tracks your response times and accuracy to identify problem areas. Built entirely with Claude Code in a single HTML file.",
    appUrl: "https://deekay.github.io/the-shed/",
    platforms: "Desktop Web",
  },
  {
    id: 4,
    name: "Impressionista",
    logoUrl: "https://flints.dev/api/objects/uploads/b519671e-9dc0-4ee0-aade-d93c00666329",
    description: "Impressionista is a simple app that allows you to make impressionist-style portraits of any subject you want. Each image generation will require a small bitcoin payment. You can then choose to pay a bit more bitcoin to turn your portrait into an impressionist video.",
    appUrl: "https://impressionista.fun/",
    platforms: "Mobile Web,Desktop Web",
  },
  {
    id: 1,
    name: "Bitcoin Lockbox",
    logoUrl: "https://flints.dev/api/objects/uploads/d9c99524-f7c3-4f01-a5f9-57d39bab8907",
    description: "Bitcoin Lockbox allows you easily send time-locked gifts of on-chain bitcoin to first-time bitcoin users. It supports both email bitcoin gifts and a print-at-home version.",
    appUrl: "https://bitcoinlockbox.xyz/",
    platforms: "Mobile Web,Desktop Web",
  },
];

const FirewoodPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const authResponse = await fetch("/api/auth/me");

        if (authResponse.ok) {
          const authData = await authResponse.json();
          setIsLoggedIn(authData.authenticated);
        }
      } catch (error) {
        console.error("Failed to fetch authentication:", error);
      }
    };

    fetchAuth();
  }, []);

  return (
    <Box bg="#FEF8F3" minH="100vh">
      {isLoggedIn ? (
        <Header navItems={membersNavItems} />
      ) : (
        <Box pt={{ base: "30px", md: "40px" }} px={{ base: "20px", md: "40px" }}>
          <Container maxW="900px">
            <VStack align="center">
              <Link href="/" passHref legacyBehavior>
                <ChakraLink _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
                  <Image
                    src="/assets/logo.png"
                    alt="Flint Logo"
                    h={{ base: "40px", md: "65px" }}
                    w="auto"
                  />
                </ChakraLink>
              </Link>
            </VStack>
          </Container>
        </Box>
      )}

      <Box 
        pt={{ base: isLoggedIn ? "40px" : "30px", md: isLoggedIn ? "60px" : "40px" }}
        pb={{ base: "60px", md: "80px" }}
        px={{ base: "20px", md: "40px" }}
      >
        <Container maxW="900px">
          <VStack spacing={{ base: 6, md: 8 }} align="center">
            <Heading
              as="h1"
              fontSize={{ base: "40px", sm: "48px", md: "64px" }}
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
              w={{ base: "200px", md: "280px" }}
              h="auto"
            />

            <Text
              fontSize={{ base: "18px", md: "22px" }}
              fontFamily="EB Garamond"
              color="#767676"
              textAlign="center"
              maxW="600px"
            >
              Products by the Flint Community that might be the start of something.
            </Text>

            <VStack spacing={4} align="stretch" w="100%">
              {firewoodApps.map((app) => (
                <FirewoodAppCard
                  key={app.id}
                  name={app.name}
                  logoUrl={app.logoUrl}
                  description={app.description}
                  appUrl={app.appUrl}
                  platforms={app.platforms}
                />
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>

      <Footer isLoggedIn={isLoggedIn} />
    </Box>
  );
};

export default FirewoodPage;
