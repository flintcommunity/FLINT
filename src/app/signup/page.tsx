"use client";

import React from "react";
import { Box, Container, VStack, Text, Input, Image } from "@chakra-ui/react";
import Link from "next/link";
import Button from "@/components/Button/Button";

const SignupPage = () => {
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
            Become a Flint Member
          </Text>

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

            <Button w="100%" maxW="280px" mt={4}>
              Continue with Discord
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignupPage;
