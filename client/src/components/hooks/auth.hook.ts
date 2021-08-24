import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null);
  const [userId, setUserId] = useState<null | number>(null);
  const [isAdmin, setAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken: string, id: number, admin: boolean) => {
    setToken(jwtToken);
    setUserId(id);
    setAdmin(admin);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: jwtToken,
        isAdmin: admin,
      })
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") as string);
    if (data && data.token) {
      login(data.token, data.userId, data.isAdmin);
    }
    setIsReady(true);
  }, [login]);

  return { login, logout, token, userId, isReady, isAdmin };
};
