"use client";

import React from "react";
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
  // TODO: Replace with actual user data from authentication
  const memberName = "Mat";
  const daysActive = 45;
  const thingsShipped = 3;

  return (
    <Box>
      <Header navItems={membersNavItems} />
      
      <MemberWelcome 
        memberName={memberName}
        daysActive={daysActive}
        thingsShipped={thingsShipped}
      />

      <ValuesSection />

      <GoalsSection />

      <GuidanceSection />

      <ProductProgressionSection />

      <Footer />
    </Box>
  );
};

export default FieldGuidePage;
