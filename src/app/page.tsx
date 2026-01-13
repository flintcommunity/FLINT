"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  return (
    <Box>
      <Header />
      <HeroSection />
      <Footer />
    </Box>
  );
};

export default Home;
