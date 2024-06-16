import React from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from 'react-router-dom';
import lo1 from 'C:/Users/lnyandoro/Desktop/Attachment/AI Recruitment - Copy/recruit/src/ntone-horizontal.png';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { RxDashboard } from "react-icons/rx";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdWorkOutline, MdOutlineMarkEmailRead } from "react-icons/md";
import { FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';

const LinkItems = [
  { name: 'Home', icon: RxDashboard, to: '/recruiter/home' },
  { name: 'Applications', icon: MdOutlineMarkEmailRead, to: '/recruiter/applications' },
  { name: 'Interviews', icon: RiCalendarScheduleLine, to: '/recruiter/interviews' },
  { name: 'View Jobs', icon: FiSettings, to: '/recruiter/jobs' },
];

export default function Dashboard({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, path, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
       <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
  <img src={lo1} alt="Logo" />
  <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem path={path} key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ path, icon, children, to, ...rest }) => {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      {({ isActive }) => (
        <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'orange.400' : 'transparent'}
        color={isActive ? 'white' : 'inherit'}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
      )}
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
              <Avatar
                  size={'sm'}
                  name={'Lyn Nyandoro'}
                  bg={'orange.400'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Lyn Nyandoro</Text>
                  <Text fontSize="xs" color="gray.600">
                    Recruiter
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuDivider />
              <MenuItem onClick={() => { navigate('/') }}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
