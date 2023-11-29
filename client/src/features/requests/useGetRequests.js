import { useQuery } from "@tanstack/react-query";
import getDemanders from "../../services/getDemanders";

function useGetRequests() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-requests"],
    queryFn: getDemanders,
  });
  return { data, isLoading };
}

export default useGetRequests;
