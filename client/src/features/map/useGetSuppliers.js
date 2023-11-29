import { useQuery } from "@tanstack/react-query";
import getSuppliers from "../../services/getSuppliers";

function useGetSuppliers() {
  const { data, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });
  return { data, isLoading };
}

export default useGetSuppliers;
