"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import GatherSection from "@/components/GatherSection/GatherSection";
import WhyApplySection from "@/components/WhyApplySection/WhyApplySection";
import ApplicationSection from "@/components/ApplicationSection/ApplicationSection";
import DisclaimersSection from "@/components/DisclaimersSection/DisclaimersSection";
import FirewoodSection from "@/components/FirewoodSection/FirewoodSection";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            router.replace("/members/field-guide");
          }
        }
      } catch (error) {
        // Not logged in, stay on home page
      }
    };
    checkAuth();
  }, [router]);

  return (
    <Box>
      <Header />
      <HeroSection />
      <AboutSection />
      <GatherSection />
      <WhyApplySection />
      <ApplicationSection />
      <DisclaimersSection />
      <FirewoodSection />
      <Footer />
    </Box>
  );
};

export default Home;
