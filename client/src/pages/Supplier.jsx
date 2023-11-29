import { Button, TextField, IconButton } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import FormRow from "../ui/FormRow";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatCurrency } from "../utils/helper";
import submitForm from "../services/submitForm";

function Supplier() {
  const [itemTotalPrices, setItemTotalPrices] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      items: [{ productType: "", unitPrice: "", quantity: "", totalPrice: "" }],
    },
  });

  const watchFields = watch("items");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(data) {
    const roleData = {
      email: data.orgEmail,
      orgName: data.orgName,
      address: data.orgAddress,
    };
    const productsData = data.items.map((item) => ({
      productName: item.productType,
      unitPrice: parseFloat(item.unitPrice),
      totalPrice: parseFloat(item.unitPrice) * parseFloat(item.quantity),
      quantity: parseFloat(item.quantity),
    }));
    submitForm("supplier", roleData, productsData);
    toast.success("Request submitted!");
    setSumPrice(0);
    reset();
  }

  const updateItemTotalPrice = (index, totalPrice) => {
    const newItemTotalPrices = [...itemTotalPrices];
    newItemTotalPrices[index] = parseFloat(totalPrice) || 0;
    setItemTotalPrices(newItemTotalPrices);
  };

  const calculateSumPrice = () => {
    const total = itemTotalPrices.reduce((acc, price) => {
      return acc + (parseFloat(price) || 0);
    }, 0);
    setSumPrice(total);
  };
  useEffect(() => {
    const total = itemTotalPrices.reduce((acc, price) => acc + price, 0);
    setSumPrice(total);
  }, [itemTotalPrices]);

  const textFieldInputStyle = {
    fontSize: "24px",
    inputHeight: "12px",
  };

  const textFieldStyle = {
    marginTop: "12px",
    fontSize: "16px",
  };

  const formRowStyle = {
    height: "12px",
    fontSize: "16px",
    width: "300px",
  };

  const btnStyle = {
    fontSize: "16px",
    marginTop: "12px",
  };

  return (
    <form
      className="w-[1000px] ml-auto mr-auto mb-8 mt-48 flex flex-col gap-2 px-10 py-16 align-middle bg-slate-100 rounded-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-5xl font-bold mb-4">Donate Online Today</h2>
      <h2 className="text-2xl font-semibold text-gray-500 mb-4">
        Help build a healthy, caring, inclusive community by supporting people
        in need. Your generosity helps United Way invest in vital programs and
        services right in your community. All donations stay 100% local. United,
        we are stronger.
      </h2>

      <FormRow label="Email" error={errors?.orgEmail?.message}>
        <TextField
          sx={{ input: formRowStyle }}
          id="orgEmail"
          {...register("orgEmail", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Name" error={errors?.orgName?.message}>
        <TextField
          sx={{ input: formRowStyle }}
          id="orgName"
          {...register("orgName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.orgAddress?.message}>
        <TextField
          sx={{ input: formRowStyle }}
          id="orgAddress"
          {...register("orgAddress", { required: "This field is required" })}
        />
      </FormRow>

      {fields.map((item, index) => (
        <div key={item.id} className="flex justify-between items-end gap-2">
          <TextField
            style={textFieldStyle}
            label="Product"
            sx={{ input: textFieldInputStyle, flex: 1 }}
            {...register(`items[${index}].productType`, {
              required: "This field is required",
            })}
          />
          <TextField
            label="Unit Price"
            sx={{ input: textFieldInputStyle, flex: 1 }}
            {...register(`items[${index}].unitPrice`, {
              required: "This field is required",
              pattern: {
                value: /^([1-9]\d*|0)(\.\d{0,2})?$/,
                message: "Invalid number format",
              },
            })}
            onChange={(e) => {
              const unitPrice = parseFloat(e.target.value);
              const quantity = parseFloat(watchFields[index]?.quantity || 0); // Get quantity from form data
              const totalPrice = unitPrice * quantity;
              updateItemTotalPrice(index, totalPrice);
              calculateSumPrice();
              // Update the "Total Price" field
              document.getElementById(`items[${index}].totalPrice`).value =
                totalPrice.toFixed(2);
            }}
          />
          <TextField
            type="number"
            label="Quantity"
            sx={{ input: textFieldInputStyle, flex: 1 }}
            {...register(`items[${index}].quantity`, {
              required: "This field is required",
            })}
            onChange={(e) => {
              const quantity = parseFloat(e.target.value);
              const unitPrice = parseFloat(watchFields[index]?.unitPrice || 0); // Get unit price from form data
              const totalPrice = unitPrice * quantity;
              updateItemTotalPrice(index, totalPrice);
              calculateSumPrice();
              document.getElementById(`items[${index}].totalPrice`).value =
                totalPrice.toFixed(2);
            }}
          />
          <TextField
            label=""
            type="text"
            sx={{ input: textFieldInputStyle, flex: 1 }}
            id={`items[${index}].totalPrice`}
            disabled
          />
          <IconButton onClick={() => remove(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      <div className="flex justify-between">
        <Button
          style={btnStyle}
          type="button"
          onClick={() =>
            append({ productType: "", unitPrice: "", quantity: "" })
          }
          variant="outlined"
        >
          Add Product
        </Button>

        <div className="flex items-center text-red-500 font-bold text-[24px] mt-6">
          Total: {formatCurrency(sumPrice)}
        </div>
        <Button
          style={btnStyle}
          type="submit"
          variant="contained"
          className="w-1/6"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default Supplier;
