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
  { label: "Kindling", href: "/members/kindling" }
];

const FieldGuidePage = () => {
  const [memberName, setMemberName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [daysActive, setDaysActive] = useState(0);
  const thingsShipped = 0;

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
          const diffTime = Math.abs(now.getTime() - createdAt.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysActive(diffDays);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Box>
      <Header navItems={membersNavItems} />
      
      <MemberWelcome 
        memberName={memberName || "Member"}
        daysActive={daysActive}
        thingsShipped={thingsShipped}
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
