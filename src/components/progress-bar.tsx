import React from 'react';
import { Box, keyframes } from '@chakra-ui/react';

interface ProgressBarProps {
  isLoading: boolean;
  height?: string;
  color?: string;
  width?: string;
}

const progressAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  isLoading,
  height = '2px',
  color = 'blue.500',
  width = '30%',
}) => {
  if (!isLoading) return null;

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      height={height}
      overflow="hidden"
      zIndex="9999"
    >
      <Box
        position="absolute"
        height="100%"
        width={width}
        bg={color}
        animation={`${progressAnimation} 1.5s ease-in-out infinite`}
        opacity="0.7"
      />
    </Box>
  );
};
