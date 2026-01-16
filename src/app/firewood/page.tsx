"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, VStack, Text, Image, Heading, Spinner, Link as ChakraLink } from "@chakra-ui/react";
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

const FirewoodPage = () => {
  const [apps, setApps] = useState<FirewoodApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsResponse, authResponse] = await Promise.all([
          fetch("/api/apps/firewood"),
          fetch("/api/auth/me")
        ]);

        if (appsResponse.ok) {
          const data = await appsResponse.json();
          setApps(data.apps || []);
        }

        if (authResponse.ok) {
          const authData = await authResponse.json();
          setIsLoggedIn(authData.authenticated);
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
                  No products featured yet. Check back soon!
                </Text>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch" w="100%">
                {apps.map((app) => (
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
            )}
          </VStack>
        </Container>
      </Box>

      <Footer isLoggedIn={isLoggedIn} />
    </Box>
  );
};

export default FirewoodPage;
