import { useQuery } from "@tanstack/react-query";
import { getTestData } from "../../services/getTestData";
import toast from "react-hot-toast";

function useGetSomeData() {
  const { data, isLoading } = useQuery({
    queryFn: getTestData,
    queryKey: ["test-data"],
    onError: () => toast.error("Failed to get data!"),
    onSuccess: () => toast.success("Successful to get data!"),
  });
  return { data, isLoading };
}

export default useGetSomeData;
