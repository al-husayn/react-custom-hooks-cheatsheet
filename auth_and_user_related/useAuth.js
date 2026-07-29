// useAuth - read auth context (login/logout)
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth needs AuthProvider");
  return ctx; // {user, login, logout }
}