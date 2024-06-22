import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("setting edited successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { editSetting, isEditing };
}

export default useUpdateSetting;
