import RequestItem from "./RequestItem";
import useGetRequests from "../features/requests/useGetRequests";
import { productAmount, transformData } from "../utils/helper";

// function transformData(originalData) {
//   return originalData.map((item) => {
//     return {
//       id: String(item.id),
//       name: item.organizationName,
//       address: item.address,
//       products: item.products.map((product) => ({
//         name: product.productName,
//         quantity: product.quantity,
//       })),
//       latlng: item.latlng,
//       timeStamp: new Date(item.products[0]?.createdAt).toLocaleString(),
//     };
//   });
// }

function Requests() {
  const { data, isLoading } = useGetRequests();

  if (isLoading) return null;

  const realData = transformData(data);

  return (
    <ul>
      {realData.map(
        (item) =>
          productAmount(item) > 0 && (
            <RequestItem key={item.id} request={item} />
          )
      )}
    </ul>
  );
}

export default Requests;
