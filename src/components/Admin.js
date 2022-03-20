import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  Input,
  Button,
  FormLabel,
  Container,
  Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { UserState } from "../context/ContextProvider";
import Navbar from "./Navbar";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Admin = () => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const [theatres, setTheatres] = useState([]);
  const [films, setFilms] = useState([]);
  const [shows, setShows] = useState([]);

  const [selectedFilmForFilmAssign, setSelectedFilmForFilmAssign] =
    useState("");
  const [selectedShowForFilmAssign, setSelectedShowForFilmAssign] =
    useState("");
  const [selectedTheatreForFilmAssign, setSelectedTheatreForFilmAssign] =
    useState("");

  const { user, selectedTheatre } = UserState();

  const handleFilmAssign = async () => {
    if (
      !selectedTheatreForFilmAssign ||
      !selectedFilmForFilmAssign ||
      !selectedShowForFilmAssign
    ) {
      toast({
        title: "please fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.put(
        `${baseUrl}/api/v1/film/assignToTheatre`,
        {
          theatreId: selectedTheatreForFilmAssign,
          filmId: selectedFilmForFilmAssign,
          showId: selectedShowForFilmAssign,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status) {
        toast({
          title: "Film assigned successfuly",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSelectedTheatreForFilmAssign("");
        setSelectedFilmForFilmAssign("");
        setSelectedShowForFilmAssign("");
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to assign",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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

  useEffect(() => {
    const fetchFilms = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/film/${selectedTheatreForFilmAssign}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setFilms([...data]);
    };
    selectedTheatreForFilmAssign && fetchFilms();
  }, [selectedTheatreForFilmAssign]);

  useEffect(() => {
    const fetchShows = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/theatre/shows/${selectedTheatreForFilmAssign}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setShows([...data]);
    };
    selectedTheatreForFilmAssign && fetchShows();
  }, [selectedTheatreForFilmAssign]);

  return (
    <>
      <Navbar />

      <Container>
        <Tabs>
          <TabList>
            <Tab>Create Theatre</Tab>
            <Tab>Create Film</Tab>
            <Tab>Assign Film to Theatre</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FormControl isRequired>
                <FormLabel>Theatre</FormLabel>
                <Input placeholder="Theatre name" />
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={loading}
                  type="submit"
                >
                  Create
                </Button>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl isRequired>
                <FormLabel>Film</FormLabel>
                <Input placeholder="Film name" />
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={loading}
                  type="submit"
                >
                  Create
                </Button>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <FormLabel htmlFor="theatre">Theatre</FormLabel>
                <Select
                  id="theatre"
                  placeholder="Select theatre"
                  value={selectedTheatreForFilmAssign}
                  onChange={(e) => {
                    setSelectedTheatreForFilmAssign(e.target.value);
                  }}
                >
                  {theatres.map((t) => (
                    <option value={t._id}>{t.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="film">Film</FormLabel>
                <Select
                  id="film"
                  placeholder="Select film"
                  value={selectedFilmForFilmAssign}
                  onChange={(e) => setSelectedFilmForFilmAssign(e.target.value)}
                >
                  {films.map((f) => (
                    <option value={f._id}>{f.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="show">Show</FormLabel>
                <Select
                  id="show"
                  placeholder="Select show"
                  value={selectedShowForFilmAssign}
                  onChange={(e) => setSelectedShowForFilmAssign(e.target.value)}
                >
                  {shows.map((s) => (
                    <option value={s._id}>{s.name}</option>
                  ))}
                </Select>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={loading}
                type="submit"
                onClick={handleFilmAssign}
              >
                Assign
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default Admin;
