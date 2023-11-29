import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequesterProducts } from "../../services/updateProducts";

function useUpdateRequesterProducts() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (li) => {
      // Using Promise.all to wait for all updates to complete
      await Promise.all(
        li.map((item) => {
          const { id, newQuantity } = item;
          return updateRequesterProducts(id, newQuantity);
        })
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["all-requests"],
      }),
  });
  return { mutate, isPending };
}

export default useUpdateRequesterProducts;
