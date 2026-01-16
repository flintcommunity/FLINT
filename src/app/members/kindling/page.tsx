"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, VStack, Text, Spinner, Heading } from "@chakra-ui/react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";
import AppCard from "@/components/AppCard/AppCard";

const membersNavItems = [
  { label: "Field Guide", href: "/members/field-guide" },
  { label: "Resources", href: "/members/resources" },
  { label: "Ideas", href: "/members/ideas" },
  { label: "Kindling", href: "/members/kindling" },
  { label: "Firewood", href: "/firewood" }
];

interface App {
  id: number;
  name: string;
  logoUrl: string | null;
  description: string;
  appUrl: string;
  feedbackRequested: string;
  platforms: string;
  videoUrl: string | null;
  initialPrompt: string | null;
  githubUrl: string | null;
  createdAt: string;
  userId: number;
  userDiscordUsername: string | null;
  userDiscordAvatar: string | null;
}

const KindlingPage = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsResponse, authResponse] = await Promise.all([
          fetch("/api/apps"),
          fetch("/api/auth/me"),
        ]);

        if (appsResponse.ok) {
          const data = await appsResponse.json();
          setApps(data.apps || []);
        }

        if (authResponse.ok) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box bg="#FEF8F3" minH="100vh">
      <Header navItems={membersNavItems} />

      <Box 
        pt={{ base: "40px", md: "60px" }}
        pb={{ base: "60px", md: "80px" }}
        px={{ base: "20px", md: "40px" }}
      >
        <Container maxW="900px">
          <VStack spacing={{ base: 6, md: 8 }} align="stretch">
            <VStack spacing={4} align="center">
              <Heading
                as="h1"
                fontSize={{ base: "40px", sm: "48px", md: "64px" }}
                fontWeight="500"
                color="#000"
                fontFamily="EB Garamond"
                textAlign="center"
                lineHeight="normal"
              >
                Kindling
              </Heading>
              <Text
                fontSize={{ base: "18px", md: "22px" }}
                fontFamily="EB Garamond"
                color="#767676"
                textAlign="center"
                maxW="600px"
              >
                Products built by the Flint Community.
              </Text>
              <Button
                as={Link}
                href="/members/kindling/submit"
                mt={4}
                w={{ base: "100%", sm: "auto" }}
                px={8}
              >
                Submit your app
              </Button>
            </VStack>

            {isLoading ? (
              <VStack py={10}>
                <Spinner size="xl" color="#FBB420" thickness="3px" />
              </VStack>
            ) : apps.length === 0 ? (
              <VStack py={10} spacing={4}>
                <Text
                  fontSize={{ base: "18px", md: "20px" }}
                  fontFamily="EB Garamond"
                  color="#767676"
                  textAlign="center"
                >
                  No apps submitted yet. Be the first to share what you're building!
                </Text>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                {apps.map((app) => (
                  <AppCard
                    key={app.id}
                    name={app.name}
                    logoUrl={app.logoUrl}
                    description={app.description}
                    appUrl={app.appUrl}
                    feedbackRequested={app.feedbackRequested}
                    platforms={app.platforms}
                    videoUrl={app.videoUrl}
                    initialPrompt={app.initialPrompt}
                    githubUrl={app.githubUrl}
                    userDiscordUsername={app.userDiscordUsername}
                    userDiscordAvatar={app.userDiscordAvatar}
                    createdAt={app.createdAt}
                  />
                ))}
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>

      <Footer isLoggedIn={isLoggedIn} />
    </Box>
  );
};

export default KindlingPage;
