import React, { useState } from "react";
import "./styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Checkout() {
  const [ifDiscounted, setDiscounted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const ONTaxRate = 0.13;
  const subtotal = useSelector((state) => state.cart.total).toFixed(2);
  const tax = Number(subtotal * ONTaxRate).toFixed(2); //round to 2 decimals places
  const discountAmount = ifDiscounted
    ? ((Number(subtotal) + Number(tax)) * 0.2).toFixed(2)
    : Number(0).toFixed(2);
  const total = (Number(subtotal) + Number(tax) - discountAmount).toFixed(2);

  return (
    <div>
      <TableContainer className="checkout-container lg:fixed">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: "none" }}>
                <Typography variant="h5" style={{ fontWeight: 400 }}>
                  Summary
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ borderBottom: "none" }}>Subtotal </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="right">
                $ {subtotal}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ borderBottom: "none" }}>Discount </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="right">
                -$ {discountAmount}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">$ {tax}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ borderBottom: "none" }}>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="right">
                <Typography style={{ borderBottom: "none" }} variant="h6">
                  $ {total}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-60" style={{ borderBottom: "none" }}>
                {" "}
                <TextField
                  className="discount-input"
                  label="Discount Code"
                  onInput={(e) => setDiscountCode(e.target.value)}
                />
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    if (discountCode === "SAVE20" && !ifDiscounted) {
                      setDiscounted(true);
                    }
                  }}
                >
                  Apply
                </Button>
              </TableCell>
            </TableRow>
            <p className="opacity-20">🤫 Try SAVE20 for Discounts</p>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
