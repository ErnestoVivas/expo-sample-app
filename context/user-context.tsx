import { createContext, useContext, useState } from 'react';

interface UserContextValue {
  firstName: string;
  lastName: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
}

const UserContext = createContext<UserContextValue>({
  firstName: '',
  lastName: '',
  setFirstName: () => {},
  setLastName: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <UserContext.Provider value={{ firstName, lastName, setFirstName, setLastName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
