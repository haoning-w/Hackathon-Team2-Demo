import { useQuery } from "@tanstack/react-query";
import getRequests from "../../services/getRequests";

function useGetRequests() {
  const { data, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
  return { data, isLoading };
}

export default useGetRequests;
