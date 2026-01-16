"use client";

import React from "react";
import { Box, Image, Text, VStack, HStack, Link, Badge, Wrap, WrapItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface AppCardProps {
  name: string;
  logoUrl: string | null;
  description: string;
  appUrl: string;
  feedbackRequested: string;
  platforms: string;
  videoUrl: string | null;
  initialPrompt: string | null;
  githubUrl: string | null;
  userDiscordUsername: string | null;
  userDiscordAvatar: string | null;
  createdAt: string;
}

const AppCard = ({
  name,
  logoUrl,
  description,
  appUrl,
  feedbackRequested,
  platforms,
  videoUrl,
  initialPrompt,
  githubUrl,
  userDiscordUsername,
  userDiscordAvatar,
  createdAt,
}: AppCardProps) => {
  const platformList = platforms ? platforms.split(",").filter(p => p.trim()) : [];
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
          <HStack justify="space-between" align="flex-start">
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
          </HStack>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontFamily="EB Garamond"
            color="#767676"
            noOfLines={3}
          >
            {description}
          </Text>

          {platformList.length > 0 && (
            <Wrap spacing={1}>
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

          <Text
            fontSize="14px"
            fontFamily="EB Garamond"
            color="#767676"
            fontWeight="700"
            mt={2}
          >
            Feedback requested:
          </Text>
          <Text
            fontSize="14px"
            fontFamily="EB Garamond"
            color="#767676"
            whiteSpace="pre-wrap"
          >
            {feedbackRequested}
          </Text>

          {initialPrompt && (
            <>
              <Text
                fontSize="14px"
                fontFamily="EB Garamond"
                color="#767676"
                fontWeight="700"
                mt={2}
              >
                Initial prompt:
              </Text>
              <Text
                fontSize="14px"
                fontFamily="EB Garamond"
                color="#767676"
                whiteSpace="pre-wrap"
                noOfLines={5}
              >
                {initialPrompt}
              </Text>
            </>
          )}

          <HStack justify="space-between" mt={2} flexWrap="wrap" gap={2}>
            <HStack spacing={2}>
              {userDiscordAvatar ? (
                <Image
                  src={userDiscordAvatar}
                  alt={userDiscordUsername || "User"}
                  boxSize="20px"
                  borderRadius="full"
                  objectFit="cover"
                />
              ) : (
                <Box
                  boxSize="20px"
                  borderRadius="full"
                  bg="#FBB420"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="10px" fontWeight="700" color="white">
                    {(userDiscordUsername || "U").charAt(0).toUpperCase()}
                  </Text>
                </Box>
              )}
              <Text fontSize="12px" fontFamily="EB Garamond" color="#999">
                {userDiscordUsername || "Unknown"} · {formattedDate}
              </Text>
            </HStack>
            <HStack spacing={3}>
              {videoUrl && (
                <Link
                  href={videoUrl}
                  isExternal
                  fontSize="12px"
                  fontFamily="EB Garamond"
                  color="#FBB420"
                  textDecoration="underline"
                >
                  Watch walkthrough
                </Link>
              )}
              {githubUrl && (
                <Link
                  href={githubUrl}
                  isExternal
                  fontSize="12px"
                  fontFamily="EB Garamond"
                  color="#FBB420"
                  textDecoration="underline"
                >
                  View on GitHub
                </Link>
              )}
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AppCard;
