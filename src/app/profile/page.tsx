"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, VStack, Text, Image, Spinner, Heading, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AppCard from "@/components/AppCard/AppCard";

const membersNavItems = [
  { label: "Field Guide", href: "/members/field-guide" },
  { label: "Resources", href: "/members/resources" },
  { label: "Ideas", href: "/members/ideas" },
  { label: "Kindling", href: "/members/kindling" },
  { label: "Firewood", href: "/firewood" }
];

interface User {
  id: number;
  discordUsername: string | null;
  discordAvatar: string | null;
}

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

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authResponse, appsResponse] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/apps/my")
        ]);

        if (!authResponse.ok) {
          router.push("/login");
          return;
        }

        const authData = await authResponse.json();
        if (!authData.authenticated) {
          router.push("/login");
          return;
        }
        setUser(authData.user);

        if (appsResponse.ok) {
          const appsData = await appsResponse.json();
          setApps(appsData.apps || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <Box bg="#FEF8F3" minH="100vh">
        <Header navItems={membersNavItems} />
        <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
          <Spinner size="xl" color="#FBB420" />
        </Box>
        <Footer isLoggedIn />
      </Box>
    );
  }

  return (
    <Box bg="#FEF8F3" minH="100vh">
      <Header navItems={membersNavItems} />

      <Box 
        pt={{ base: "40px", md: "60px" }}
        pb={{ base: "60px", md: "80px" }}
        px={{ base: "20px", md: "40px" }}
      >
        <Container maxW="900px">
          <VStack spacing={{ base: 6, md: 8 }} align="center">
            {user?.discordAvatar ? (
              <Image
                src={user.discordAvatar}
                alt={user.discordUsername || "Profile"}
                boxSize={{ base: "100px", md: "120px" }}
                borderRadius="full"
                objectFit="cover"
                border="3px solid"
                borderColor="#FBB420"
              />
            ) : (
              <Box
                boxSize={{ base: "100px", md: "120px" }}
                borderRadius="full"
                bg="#FBB420"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontSize={{ base: "40px", md: "48px" }}
                  fontWeight="700"
                  color="white"
                  fontFamily="EB Garamond"
                >
                  {(user?.discordUsername || "U").charAt(0).toUpperCase()}
                </Text>
              </Box>
            )}

            <Heading
              as="h1"
              fontSize={{ base: "24px", sm: "28px", md: "32px" }}
              fontWeight="500"
              color="#000"
              fontFamily="EB Garamond"
              textAlign="center"
              lineHeight="normal"
            >
              {user?.discordUsername || "Member"}
            </Heading>

            <Box w="100%" pt={{ base: 2, md: 4 }}>
              <Heading
                as="h2"
                fontSize={{ base: "24px", md: "28px" }}
                fontWeight="500"
                color="#000"
                fontFamily="EB Garamond"
                mb={{ base: 4, md: 6 }}
              >
                Apps you've shipped
              </Heading>

              {apps.length === 0 ? (
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  fontFamily="EB Garamond"
                  color="#767676"
                  textAlign="center"
                  py={8}
                >
                  You haven't submitted any apps yet. Head over to Kindling to share what you're building!
                </Text>
              ) : (
                <VStack spacing={4} align="stretch">
                  {apps.map((app) => (
                    <Box key={app.id} position="relative">
                      <AppCard
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
                      <Link href={`/members/kindling/edit/${app.id}`} passHref legacyBehavior>
                        <ChakraLink
                          position="absolute"
                          top={4}
                          right={4}
                          fontSize="14px"
                          fontFamily="EB Garamond"
                          color="#FBB420"
                          fontWeight="600"
                          _hover={{ textDecoration: "underline" }}
                        >
                          Edit
                        </ChakraLink>
                      </Link>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer isLoggedIn />
    </Box>
  );
};

export default ProfilePage;
