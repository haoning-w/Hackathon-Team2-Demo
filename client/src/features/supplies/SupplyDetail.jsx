import DeliverForm from "../../ui/DeliverForm";
import useGetSuppliers from "../map/useGetSuppliers";
import { useParams } from "react-router-dom";

function SupplyDetail() {
  const { data, isLoading } = useGetSuppliers();
  const { id } = useParams();
  if (isLoading) return null;
  const supply = data.find((item) => item.id === Number(id));
  const { orgName, address, products, email } = supply;
  return (
    <div className="mt-2">
      <h1 className="text-3xl font-bold mb-2">Supplies' info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        <h1 className="text-[18px]">Name: {orgName}</h1>
        <h1 className="text-[18px]">Email: {email}</h1>
        <h1 className="text-[18px]">Address: {address}</h1>
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-8">Product info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        {products.map((product, ind) => (
          <h1 className="text-[18px]" key={ind}>
            {product.productName}: {product.quantity}
          </h1>
        ))}
      </div>
      <h1 className="mt-8 mb-2 text-3xl font-bold">
        Input number of products you're picking up
      </h1>
      <DeliverForm products={products} />
    </div>
  );
}

export default SupplyDetail;
