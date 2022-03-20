import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SideDrawer from "./SideDrawer";
import { UserState } from "../context/ContextProvider";

function Navbar() {
  //refer https://chakra-ui.com/docs/hooks/use-disclosure
  // for side drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = UserState();

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("selectedTheatre");
    navigate("/");
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Link to="/home">
          <Avatar size="sm" cursor="pointer" />
        </Link>

        <Text fontSize="2xl" fontFamily="Work sans">
          Book My Show
        </Text>

        <div>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              {user && user.isAdmin && (
                <Link to="/admin">
                  <MenuItem>Admin</MenuItem>
                </Link>
              )}
            </MenuList>
          </Menu>
        </div>
      </Box>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Navbar;
