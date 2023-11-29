import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { accumulate, pickUpOrDrop } from "../features/delivery/deliverySlice";
import useUpdateRequesterProducts from "../features/requests/useUpdateRequesterProducts";
import useUpdateSupplierProducts from "../features/supplies/useUpdateSupplierProducts";
import { useQueryClient } from "@tanstack/react-query";

function DeliverForm({ products }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: mutateRequestProducts, isPending: isPending1 } =
    useUpdateRequesterProducts();
  const { mutate: mutateSupplierProducts, isPending: isPending2 } =
    useUpdateSupplierProducts();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, watch, reset } = useForm();
  const values = watch();
  const totalAmount = Object.values(values).reduce((acc, currentValue) => {
    const quantity = Number(currentValue) || 0;
    return acc + quantity;
  }, 0);

  const formKey = (str) => str.split("-")[0];
  const productId = (str) => Number(str.split("-")[1]);

  const convertedObj = (obj, action) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      acc[formKey(key)] =
        action === "supply" ? Number(value) : Number(value) * -1;
      return acc;
    }, {});

  function prepareData(raw) {
    return Object.entries(raw).map(([key, value]) => ({
      id: productId(key),
      newQuantity:
        products.find((item) => item.id === productId(key)).quantity -
        Number(value),
    }));
  }

  const action = searchParams.get("form");

  function onConfirm(data) {
    const result = convertedObj(data, action);
    if (action === "request") {
      mutateRequestProducts(prepareData(data));
    }
    dispatch(pickUpOrDrop(result));
    if (action === "supply") {
      dispatch(accumulate(result));
      mutateSupplierProducts(prepareData(data));
    }
    queryClient.invalidateQueries();
    toast.success(
      `Successfully ${
        action === "supply" ? "picked up" : "delivered"
      } products!`
    );
    reset();
    const des = action === "supply" ? "supplies" : "requests";
    navigate(`/main/${des}`);
  }

  return (
    <form onSubmit={handleSubmit(onConfirm)}>
      {products.map((item, ind) => (
        <div
          key={ind}
          className="w-[100%] flex justify-between mt-4 align-middle bg-[var(--color-dark--2)] px-4 py-4 rounded-2xl"
        >
          <label className="h-[100%] my-auto text-center">
            {item.productName}
          </label>
          <input
            {...register(`${item.productName}-${item.id}`)}
            className="text-[var(--color-dark--1)] w-32 h-[32px]"
            type="number"
            disabled={isPending1 || isPending2}
          />
        </div>
      ))}
      <div className="w-[100%] flex justify-end">
        <label className="block mt-4">Total Amount: {totalAmount}</label>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="border px-8 py-3 rounded-xl text-[16px] mt-4 block"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        <button
          type="submit"
          className="border px-8 py-3 rounded-xl text-[16px] mt-4 bg-[var(--color-brand--2)] text-[var(--color-dark--1)]"
          disabled={isPending1 || isPending2}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default DeliverForm;
