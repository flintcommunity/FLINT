"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection/WhyJoinSection";
import GatherSection from "@/components/GatherSection/GatherSection";
import WhyApplySection from "@/components/WhyApplySection/WhyApplySection";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  return (
    <Box>
      <Header />
      <HeroSection />
      <WhyJoinSection />
      <GatherSection />
      <WhyApplySection />
      <Footer />
    </Box>
  );
};

export default Home;
