"use client";

import React, { useState, Suspense } from "react";
import { Box, Container, VStack, Text, Input, Image, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useSearchParams } from "next/navigation";

const SignupContent = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "no_code":
        return "Discord authorization was cancelled.";
      case "config_error":
        return "Server configuration error. Please try again later.";
      case "token_exchange_failed":
        return "Failed to authenticate with Discord. Please try again.";
      case "user_fetch_failed":
        return "Failed to get user information from Discord.";
      case "no_email":
        return "We couldn't access your email from Discord. Please ensure your Discord account has a verified email.";
      case "oauth_error":
        return "An error occurred during authentication. Please try again.";
      case "invalid_state":
        return "Invalid authorization state. Please try again.";
      case "invalid_token":
        return "Invalid invite token. Please check your token and try again.";
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.valid && data.stateToken) {
        window.open(`/api/auth/discord?state=${encodeURIComponent(data.stateToken)}`, "_top");
      } else {
        setError(data.error || "Invalid invite token");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayError = error || getErrorMessage(urlError);

  return (
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
        Become a Flint Member
      </Text>

      {displayError && (
        <Alert status="error" borderRadius="0" maxW="400px">
          <AlertIcon />
          {displayError}
        </Alert>
      )}

      <VStack spacing={6} w="100%" maxW="400px">
        <Box w="100%">
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="400"
            fontFamily="EB Garamond"
            color="black"
            mb={2}
          >
            Invite token
          </Text>
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            bg="white"
            border="1px solid"
            borderColor="rgba(0,0,0,0.1)"
            borderRadius="0"
            h="50px"
            fontSize="16px"
            _focus={{
              borderColor: "#FBB420",
              boxShadow: "none",
            }}
            _hover={{
              borderColor: "rgba(0,0,0,0.2)",
            }}
          />
        </Box>

        <Button 
          w="100%" 
          maxW="280px" 
          mt={4} 
          onClick={handleSubmit}
          isLoading={loading}
          isDisabled={!token.trim()}
        >
          Continue with Discord
        </Button>
      </VStack>
    </VStack>
  );
};

const SignupPage = () => {
  return (
    <Box bg="#FEF8F3" minH="100vh" py={{ base: "40px", md: "60px" }} px={{ base: "20px", md: "40px" }}>
      <Container maxW="500px">
        <Suspense fallback={
          <VStack spacing={8} align="center" py={20}>
            <Spinner size="xl" color="#FBB420" thickness="3px" />
          </VStack>
        }>
          <SignupContent />
        </Suspense>
      </Container>
    </Box>
  );
};

export default SignupPage;
