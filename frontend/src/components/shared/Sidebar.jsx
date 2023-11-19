"use client";

import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  FiFolder,
  FiShoppingBag,
  FiFileText,
  FiStar,
  FiSettings,
  FiMenu,
  FiUser,
  FiBookOpen,
  FiPower,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import logo2 from "../../assets/logo2.png";

const LinkItemsRedirect = [
  { name: "Dashboard", icon: FiUser, path: "/dashboard" },
  { name: "Compras", icon: FiFileText, path: "compras" },
];

const LinkItems = [
  { name: "Movimentação", icon: FiFolder },
  { name: "Inventário", icon: FiStar },
  { name: "Financeiro", icon: FiShoppingBag },
  { name: "Relatórios", icon: FiBookOpen },
  { name: "Configuração", icon: FiSettings },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { logoutUser } = useAuth();

  return (
    <Box
      bg={useColorModeValue("#212529")}
      borderRight="17.5px solid"
      borderRightColor={useColorModeValue("#8EAC50")}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image borderRadius="full" src={logo2} alt="logo image" mt={5} />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          color="white"
        />
      </Flex>
      <Box mt={5}>
        {LinkItemsRedirect.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            color="white"
            path={link.path}
          >
            {link.name}
          </NavItem>
        ))}
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} color="white">
            {link.name}
          </NavItem>
        ))}
        <NavItem
          key={"Sair"}
          icon={FiPower}
          color="white"
          onClick={() => logoutUser()}
        >
          Sair
        </NavItem>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Box
      as="a"
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Estoquix
      </Text>
    </Flex>
  );
};
