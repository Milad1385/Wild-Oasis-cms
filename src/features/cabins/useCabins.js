import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { data: cabins, isLoading } = useQuery(["cabins"], getCabins);

  return { cabins, isLoading };
}

export default useCabins;
