import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [techStack, setTechStack] = useState("");
  const [api, setAPI] = useState("");
  const [auth, setAuth] = useState({});

  const context = {
    api: api,
    auth: auth,
    techStack: techStack,
    setAPI: setAPI,
    setAuth: setAuth,
    setTechStack: setTechStack,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
