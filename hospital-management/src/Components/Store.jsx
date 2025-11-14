// src/Components/Store.jsx
import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", doctor: "Dr. Williams", date: "2025-08-20" },
    { id: 2, name: "Jane Smith", doctor: "Dr. Brown", date: "2025-08-21" },
  ]);

  return (
    <StoreContext.Provider value={{ patients, setPatients }}>
      {children} 
    </StoreContext.Provider>
  );
}

// custom hook for easy use
export function useStore() {
  return useContext(StoreContext);
}
