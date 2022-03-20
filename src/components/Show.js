import { Badge, Stack, Text, Box, Container } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/ContextProvider";
import Navbar from "./Navbar";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Show = () => {
  const [films, setFilms] = useState();
  const { user, selectedTheatre } = UserState();

  useEffect(() => {
    const fetchFilms = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/film/${selectedTheatre._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setFilms([...data]);
    };
    fetchFilms();
    console.log("films=>", films);
  }, [selectedTheatre]);

  return (
    <>
      <Navbar />
      <Container>
        {selectedTheatre && (
          <>
            <Text fontSize="2xl" textAlign="center">
              {selectedTheatre.name.toUpperCase()}
            </Text>
            <Box>
              {films &&
                films.map((film) => {
                  return (
                    <Box
                      d="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      borderColor="green"
                      borderWidth="2px"
                      borderRadius="10px"
                      p={4}
                      my={2}
                    >
                      <Text mb={2}>{film.name.toUpperCase()}</Text>
                      <Stack direction="row" width="100%" justify="center">
                        <Badge colorScheme="yellow">{film.show.time}</Badge>
                      </Stack>
                    </Box>
                  );
                })}
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Show;
