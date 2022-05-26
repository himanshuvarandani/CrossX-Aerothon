import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [techStack, setTechStack] = useState("");
  const [api, setAPI] = useState("");

  const context = {
    api: api,
    techStack: techStack,
    setAPI: setAPI,
    setTechStack: setTechStack,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
