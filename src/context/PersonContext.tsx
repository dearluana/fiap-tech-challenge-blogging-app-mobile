import React, { createContext, useContext, useState, useEffect } from 'react';
import { Person } from '@/types/person';

type PersonContextType = {
  person: Person | null;
  setPerson: (person: Person) => void;
};

const PersonContext = createContext<PersonContextType>({
  person: null,
  setPerson: () => {},
});

export const PersonProvider = ({ children }: { children: React.ReactNode }) => {
  const [person, setPerson] = useState<Person | null>(null);

  return (
    <PersonContext.Provider value={{ person, setPerson }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => useContext(PersonContext);
