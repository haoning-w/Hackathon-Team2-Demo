import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import CartRow from "./CartRow";

function CartTable() {
  const cart = useSelector((store) => store.cart.cart);
  return (
    <>
      <h1 className="mb-4">a sample table</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <CartRow
                key={item.id}
                item={{ ...item, totalPrice: item.unitPrice * item.quantity }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CartTable;
