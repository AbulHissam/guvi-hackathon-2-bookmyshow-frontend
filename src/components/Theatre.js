import { Container, Text } from "@chakra-ui/react";
import React from "react";
import { UserState } from "../context/ContextProvider";
import Show from "./Show";

const Theatre = () => {
  const { selectedTheatre } = UserState();
  return (
    <Container>
      {selectedTheatre && (
        <>
          <Text fontSize="2xl" textAlign="center">
            {selectedTheatre.name.toUpperCase()}
          </Text>
          <Show theatreId={selectedTheatre._id} />
        </>
      )}
    </Container>
  );
};

export default Theatre;
