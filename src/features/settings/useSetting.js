import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSetting() {
  const { data: setting, isLoading: settingLoading } = useQuery(
    ["settings"],
    getSettings
  );

  return { setting, settingLoading };
}

export default useSetting;
