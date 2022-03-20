import { Box, Container, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserState } from "../context/ContextProvider";

const baseUrl = process.env.REACT_APP_BASE_URL;

const HomePage = () => {
  const [theatres, setTheatres] = useState();

  const { user, setSelectedTheatre } = UserState();

  useEffect(() => {
    const fetchTheatres = async () => {
      const { data } = await axios.get(`${baseUrl}/api/v1/theatre`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTheatres([...data]);
    };
    user && fetchTheatres();
  }, [user]);

  return (
    <>
      <Navbar />
      {user && (
        <div>
          <Container maxW="xl">
            <Box d="flex" flexDir="column" gap="10px" mt={2}>
              {theatres &&
                theatres.map((theatre) => {
                  return (
                    <Link to="/show" key={theatre._id}>
                      <Box
                        key={theatre.id}
                        p={2}
                        borderRadius="10px"
                        borderWidth="2px"
                        onClick={() => {
                          setSelectedTheatre(theatre);
                          localStorage.setItem(
                            "selectedTheatre",
                            JSON.stringify(theatre)
                          );
                        }}
                      >
                        <Text mb={2} textAlign="center">
                          {theatre.name.toUpperCase()}
                        </Text>
                      </Box>
                    </Link>
                  );
                })}
            </Box>
          </Container>
        </div>
      )}
    </>
  );
};

export default HomePage;
