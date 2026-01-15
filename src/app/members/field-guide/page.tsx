"use client";

import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const membersNavItems = [
  { label: "Field Guide", href: "/members/field-guide" },
  { label: "Resources", href: "/members/resources" },
  { label: "Ideas", href: "/members/ideas" },
  { label: "Kindling", href: "/members/kindling" }
];

const FieldGuidePage = () => {
  return (
    <Box>
      <Header navItems={membersNavItems} />
      
      <Box 
        bg="#FEF8F3"
        minH="80vh"
        pt={{ base: "40px", md: "60px" }}
        pb={{ base: "60px", md: "80px" }}
        px={{ base: "20px", md: "40px" }}
      >
        <Container maxW="1200px">
          <VStack spacing={{ base: 8, md: 10 }} align="center">
            <Heading
              as="h1"
              fontSize={{ base: "40px", sm: "48px", md: "64px" }}
              fontWeight="500"
              color="#000"
              fontFamily="EB Garamond"
              textAlign="center"
              lineHeight="normal"
            >
              Field Guide
            </Heading>

            <Text
              fontSize={{ base: "20px", md: "24px" }}
              fontWeight="400"
              color="#767676"
              fontFamily="EB Garamond"
              textAlign="center"
              lineHeight="normal"
              maxW="800px"
            >
              Your guide to navigating the Flint community and making the most of your membership.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default FieldGuidePage;
