"use client";

import React, { useState } from "react";
import { Box, Container, VStack, Text, Image, Link as ChakraLink, Alert, AlertIcon } from "@chakra-ui/react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "no_code":
        return "Discord authorization was cancelled.";
      case "no_account":
        return "No account found. Please sign up first.";
      case "oauth_error":
        return "An error occurred during authentication. Please try again.";
      default:
        return null;
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    window.open("/api/auth/discord/login", "_top");
  };

  const displayError = getErrorMessage(error);

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
            fontSize={{ base: "36px", md: "48px" }}
            fontWeight="400"
            fontFamily="EB Garamond"
            color="black"
            textAlign="center"
          >
            Log In
          </Text>

          {displayError && (
            <Alert status="error" borderRadius="0" maxW="400px">
              <AlertIcon />
              {displayError}
            </Alert>
          )}

          <VStack spacing={6} w="100%" maxW="400px">
            <Button 
              w="100%" 
              maxW="280px" 
              mt={4} 
              onClick={handleLogin}
              isLoading={loading}
            >
              Log in with Discord
            </Button>

            <ChakraLink
              as={Link}
              href="/signup"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="400"
              fontFamily="EB Garamond"
              color="#767676"
              textDecoration="underline"
              _hover={{ color: "black" }}
              transition="color 0.2s"
            >
              Create a Flint Account instead
            </ChakraLink>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;
