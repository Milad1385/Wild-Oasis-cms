import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updatedUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("user updated successfully :)");
    },
    onError: (err) => toast.error(err),
  });

  return { updatedUser, isUpdating };
}

export default useUpdate;
