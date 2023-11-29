import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupplierProducts } from "../../services/updateProducts";

function useUpdateSupplierProducts() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (li) => {
      // Using Promise.all to wait for all updates to complete
      await Promise.all(
        li.map((item) => {
          const { id, newQuantity } = item;
          return updateSupplierProducts(id, newQuantity);
        })
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      }),
  });
  return { mutate, isPending };
}

export default useUpdateSupplierProducts;
