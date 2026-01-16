"use client";

import React from "react";
import { Box, Image, Text, VStack, HStack, Link, Badge, Wrap, WrapItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface FirewoodAppCardProps {
  name: string;
  logoUrl: string | null;
  description: string;
  appUrl: string;
  platforms: string;
}

const FirewoodAppCard = ({
  name,
  logoUrl,
  description,
  appUrl,
  platforms,
}: FirewoodAppCardProps) => {
  const platformList = platforms ? platforms.split(",").filter(p => p.trim()) : [];

  const resolvedLogoUrl = logoUrl?.startsWith("/objects/")
    ? `/api${logoUrl}`
    : logoUrl;

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="rgba(0,0,0,0.1)"
      p={{ base: 4, md: 6 }}
      w="100%"
    >
      <HStack align="flex-start" spacing={4}>
        {resolvedLogoUrl ? (
          <Image
            src={resolvedLogoUrl}
            alt={`${name} logo`}
            boxSize={{ base: "60px", md: "80px" }}
            objectFit="cover"
            borderRadius="8px"
            border="1px solid"
            borderColor="rgba(0,0,0,0.1)"
            flexShrink={0}
          />
        ) : (
          <Box
            boxSize={{ base: "60px", md: "80px" }}
            bg="#FBB420"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Text
              fontSize={{ base: "24px", md: "32px" }}
              fontWeight="700"
              color="white"
              fontFamily="EB Garamond"
            >
              {name.charAt(0).toUpperCase()}
            </Text>
          </Box>
        )}

        <VStack align="stretch" spacing={2} flex={1}>
          <Link
            href={appUrl}
            isExternal
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="700"
            fontFamily="EB Garamond"
            color="black"
            _hover={{ textDecoration: "underline" }}
          >
            {name} <ExternalLinkIcon mx="2px" />
          </Link>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontFamily="EB Garamond"
            color="#767676"
          >
            {description}
          </Text>

          {platformList.length > 0 && (
            <Wrap spacing={1} mt={1}>
              {platformList.map((platform) => (
                <WrapItem key={platform}>
                  <Badge
                    bg="rgba(251, 180, 32, 0.2)"
                    color="#000"
                    fontFamily="EB Garamond"
                    fontWeight="400"
                    fontSize="12px"
                    px={2}
                    py={0.5}
                    borderRadius="0"
                  >
                    {platform.trim()}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default FirewoodAppCard;
