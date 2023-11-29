import { Button, TableCell, TableRow, styled } from "@mui/material";
import { formatCurrency } from "../../utils/helper";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { decreaseItem, increaseItem } from "./cartSlice";

const RoundButton = styled(Button)({
  borderRadius: "50%",
  minWidth: "24px",
  height: "24px",
  padding: "0",
  margin: "4px",
  "& .MuiButton-endIcon": {
    margin: 0,
  },
});

function CartRow({ item }) {
  const dispatch = useDispatch();
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell align="center">{formatCurrency(item.unitPrice)}</TableCell>
      <TableCell align="center">
        <RoundButton
          variant="contained"
          endIcon={<Remove />}
          onClick={() => dispatch(decreaseItem(item))}
        />
        {item.quantity}
        <RoundButton
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch(increaseItem(item))}
        />
      </TableCell>
      <TableCell align="center">{formatCurrency(item.totalPrice)}</TableCell>
    </TableRow>
  );
}

export default CartRow;
