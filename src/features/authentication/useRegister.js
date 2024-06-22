import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useRegister() {
  const { mutate: registerHandeler, isLoading: isRegistering } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("new user registered successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { registerHandeler, isRegistering };
}

export default useRegister;
