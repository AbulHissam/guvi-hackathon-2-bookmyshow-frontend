import React, { useState } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
  Text,
} from "@chakra-ui/react";

function SideDrawer({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">BMS</DrawerHeader>
        <DrawerBody>
          <Box d="flex" pb={2}>
            <Text>Drawer</Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default SideDrawer;
