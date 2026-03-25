import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// ======================
// AUTH PROVIDER
// ======================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, role, token }
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = (authData) => {
    // authData = { id, role, token }
    setUser(authData);
    localStorage.setItem("authUser", JSON.stringify(authData));
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ======================
// CUSTOM HOOK
// ======================
export function useAuth() {
  return useContext(AuthContext);
}
