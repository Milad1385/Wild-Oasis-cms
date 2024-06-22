import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("user login successfully");
      queryClient.setQueryData(["user"], data);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}

export default useLogin;
