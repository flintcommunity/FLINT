"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  VStack,
  Text,
  Input,
  Textarea,
  Image,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Checkbox,
  SimpleGrid,
  HStack,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";

const membersNavItems = [
  { label: "Field Guide", href: "/members/field-guide" },
  { label: "Resources", href: "/members/resources" },
  { label: "Ideas", href: "/members/ideas" },
  { label: "Kindling", href: "/members/kindling" },
  { label: "Firewood", href: "/firewood" }
];

const platformOptions = [
  "Mobile Web",
  "Android",
  "Windows",
  "Desktop Web",
  "iOS",
  "MacOS",
];

const SubmitAppPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    appUrl: "",
    feedbackRequested: "",
    platforms: [] as string[],
    videoUrl: "",
    initialPrompt: "",
    githubUrl: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform),
    }));
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null;

    const urlResponse = await fetch("/api/uploads/request-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: logoFile.name,
        size: logoFile.size,
        contentType: logoFile.type,
      }),
    });

    if (!urlResponse.ok) {
      throw new Error("Failed to get upload URL");
    }

    const { uploadURL, objectPath } = await urlResponse.json();

    const uploadResponse = await fetch(uploadURL, {
      method: "PUT",
      body: logoFile,
      headers: { "Content-Type": logoFile.type },
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload logo");
    }

    return objectPath;
  };

  const handleSubmit = async () => {
    setError("");
    
    if (!formData.name.trim()) {
      setError("App name is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Short description is required");
      return;
    }
    if (!formData.appUrl.trim()) {
      setError("URL is required");
      return;
    }
    if (!formData.feedbackRequested.trim()) {
      setError("Feedback requested is required");
      return;
    }

    setLoading(true);

    try {
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadLogo();
      }

      const response = await fetch("/api/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          logoUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit app");
      }

      router.push("/members/kindling");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="#FEF8F3" minH="100vh">
      <Header navItems={membersNavItems} />
      
      <Box py={{ base: "40px", md: "60px" }} px={{ base: "20px", md: "40px" }}>
        <Container maxW="500px">
          <VStack spacing={{ base: 5, md: 6 }} align="stretch">
            <Text
              fontSize={{ base: "36px", md: "48px" }}
              fontWeight="500"
              fontFamily="EB Garamond"
              color="black"
              textAlign="center"
              mb={4}
            >
              Submit your app
            </Text>

            {error && (
              <Alert status="error" borderRadius="0">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                App name
              </FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                h="44px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={1}>
                App logo
              </FormLabel>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoSelect}
                style={{ display: "none" }}
              />
              {logoPreview ? (
                <HStack spacing={3}>
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="4px"
                    border="1px solid"
                    borderColor="rgba(0,0,0,0.1)"
                  />
                  <IconButton
                    aria-label="Remove logo"
                    icon={<CloseIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={removeLogo}
                  />
                </HStack>
              ) : (
                <Text fontFamily="EB Garamond" fontSize="14px" color="#767676">
                  <ChakraLink
                    onClick={triggerFileInput}
                    textDecoration="underline"
                    cursor="pointer"
                    _hover={{ color: "black" }}
                  >
                    Upload
                  </ChakraLink>
                  {" "}a square logo. (PNG or JPG, 512x512px recommended)
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                Short description
              </FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                minH="100px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                URL (or link to download binary)
              </FormLabel>
              <Input
                name="appUrl"
                value={formData.appUrl}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                h="44px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                Feedback requested (quick bullets)
              </FormLabel>
              <Textarea
                name="feedbackRequested"
                value={formData.feedbackRequested}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                minH="100px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                Platforms
              </FormLabel>
              <SimpleGrid columns={3} spacing={2}>
                {platformOptions.map((platform) => (
                  <Checkbox
                    key={platform}
                    isChecked={formData.platforms.includes(platform)}
                    onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                    fontFamily="EB Garamond"
                    fontSize="14px"
                    colorScheme="orange"
                    size="sm"
                  >
                    {platform}
                  </Checkbox>
                ))}
              </SimpleGrid>
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                Link to video walkthrough (e.g. Loom)
              </FormLabel>
              <Input
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                h="44px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                Initial prompt
              </FormLabel>
              <Textarea
                name="initialPrompt"
                value={formData.initialPrompt}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                minH="120px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily="EB Garamond" fontSize="16px" fontWeight="700" mb={2}>
                Link to Github repo
              </FormLabel>
              <Input
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                bg="white"
                border="1px solid"
                borderColor="rgba(0,0,0,0.2)"
                borderRadius="0"
                h="44px"
                fontSize="16px"
                _focus={{ borderColor: "#FBB420", boxShadow: "none" }}
              />
            </FormControl>

            <Box pt={4}>
              <Button
                onClick={handleSubmit}
                isLoading={loading}
                w="100%"
                h="50px"
              >
                Submit your app
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer isLoggedIn={true} />
    </Box>
  );
};

export default SubmitAppPage;
