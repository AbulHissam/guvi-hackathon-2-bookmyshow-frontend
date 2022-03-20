import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [selectedTheatre, setSelectedTheatre] = useState();

  useEffect(() => {
    const selectedTheatre = JSON.parse(localStorage.getItem("selectedTheatre"));
    if (selectedTheatre) setSelectedTheatre(selectedTheatre);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    } else {
      setUser(userInfo);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, selectedTheatre, setSelectedTheatre }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};
export default ContextProvider;
