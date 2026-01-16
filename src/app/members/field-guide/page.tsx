"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MemberWelcome from "@/components/MemberWelcome/MemberWelcome";
import ValuesSection from "@/components/ValuesSection/ValuesSection";
import GoalsSection from "@/components/GoalsSection/GoalsSection";
import GuidanceSection from "@/components/GuidanceSection/GuidanceSection";
import ProductProgressionSection from "@/components/ProductProgressionSection/ProductProgressionSection";

const membersNavItems = [
  { label: "Field Guide", href: "/members/field-guide" },
  { label: "Resources", href: "/members/resources" },
  { label: "Ideas", href: "/members/ideas" },
  { label: "Kindling", href: "/members/kindling" },
  { label: "Firewood", href: "/firewood" }
];

const FieldGuidePage = () => {
  const [memberName, setMemberName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [daysActive, setDaysActive] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setMemberName(data.user.discordUsername);
          setIsLoggedIn(true);
          
          const createdAt = new Date(data.user.createdAt);
          const now = new Date();
          
          const createdDateOnly = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());
          const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          const diffTime = nowDateOnly.getTime() - createdDateOnly.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          setDaysActive(diffDays);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <Box>
      <Header navItems={membersNavItems} />
      
      <MemberWelcome 
        memberName={memberName}
        daysActive={daysActive}
        isLoading={isLoading}
      />

      <ValuesSection />

      <GoalsSection />

      <GuidanceSection />

      <ProductProgressionSection />

      <Footer isLoggedIn={isLoggedIn} />
    </Box>
  );
};

export default FieldGuidePage;
