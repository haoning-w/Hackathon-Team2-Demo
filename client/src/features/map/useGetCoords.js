import { useQuery } from "@tanstack/react-query";
import addressToCoords from "../../services/getLocationCoords";

function useGetCoords(address) {
  const { data, isLoading } = useQuery({
    queryKey: [address],
    queryFn: () => addressToCoords(address),
  });
  return { data, isLoading };
}

export default useGetCoords;
