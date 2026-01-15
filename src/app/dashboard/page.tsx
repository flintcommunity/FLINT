"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, VStack, Text, Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  discordUsername: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setUser(data.user);
          } else {
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/auth/logout";
    document.body.appendChild(form);
    form.submit();
  };

  if (loading) {
    return (
      <Box bg="#FEF8F3" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="#FBB420" />
      </Box>
    );
  }

  return (
    <Box bg="#FEF8F3" minH="100vh" py={{ base: "40px", md: "60px" }} px={{ base: "20px", md: "40px" }}>
      <Container maxW="500px">
        <VStack spacing={{ base: 8, md: 10 }} align="center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Flint Logo"
              h={{ base: "40px", md: "50px" }}
              w="auto"
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            />
          </Link>

          <Text
            fontSize={{ base: "28px", md: "36px" }}
            fontWeight="400"
            fontFamily="EB Garamond"
            color="black"
            textAlign="center"
          >
            You are logged into Flint
          </Text>

          {user && (
            <VStack spacing={4} w="100%" maxW="400px" bg="white" p={6} borderRadius="0" border="1px solid rgba(0,0,0,0.1)">
              <Box w="100%">
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  fontFamily="EB Garamond"
                  color="#767676"
                  mb={1}
                >
                  Discord Screen Name
                </Text>
                <Text
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight="400"
                  fontFamily="EB Garamond"
                  color="black"
                >
                  {user.discordUsername}
                </Text>
              </Box>

              <Box w="100%">
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  fontFamily="EB Garamond"
                  color="#767676"
                  mb={1}
                >
                  Email Address
                </Text>
                <Text
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight="400"
                  fontFamily="EB Garamond"
                  color="black"
                >
                  {user.email}
                </Text>
              </Box>
            </VStack>
          )}

          <Button onClick={handleLogout} w="100%" maxW="200px">
            Log Out
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default DashboardPage;
