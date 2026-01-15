"use client";

import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps {
    children: React.ReactNode;
    as?: any;
    href?: string;
    target?: string;
    rel?: string;
    w?: any;
    h?: any;
    onClick?: () => void;
    [key: string]: any;
}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <ChakraButton
            bg="#FBB420"
            color="#000"
            fontSize={{ base: "17px", md: "19px", lg: "20px" }}
            fontWeight="500"
            fontFamily="EB Garamond"
            h="58px"
            borderRadius="0"
            lineHeight="normal"
            _hover={{
                bg: "#E09612"
            }}
            transition="all 0.2s"
            {...props}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;
