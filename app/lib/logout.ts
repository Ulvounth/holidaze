export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "GET",
  });
};
