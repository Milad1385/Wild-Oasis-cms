import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutHandler, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("user logout successfully");
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  return { logoutHandler, isLoading };
}

export default useLogout;
