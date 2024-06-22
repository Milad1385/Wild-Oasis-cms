import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

function useAuthorized() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user: data?.user,
    isLoading,
    isAuthenticated: data?.user?.role === "authenticated" ? true : false,
  };
}

export default useAuthorized;
