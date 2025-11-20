import { Flex, Image, Text } from "@chakra-ui/react";

export const GitaryBrand = ({ 
  showLogo = true, 
  showName = true, 
  size = "md" 
}: { 
  showLogo?: boolean; 
  showName?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeMap = {
    sm: { logo: "16px", fontSize: "xs" },
    md: { logo: "24px", fontSize: "sm" },
    lg: { logo: "32px", fontSize: "md" },
  };
  const styles = sizeMap[size];

  return (
    <Flex align="center" gap={2}>
      {showLogo && (
        <Image
          src="/logo.svg"
          alt="Gitary"
          width={styles.logo}
          height={styles.logo}
          flexShrink={0}
        />
      )}
      {showName && (
        <Text
          fontSize={styles.fontSize}
          fontWeight="semibold"
          color="gray.700"
          _dark={{ color: "gray.300" }}
          letterSpacing="tight"
        >
          Gitary
        </Text>
      )}
    </Flex>
  );
};
