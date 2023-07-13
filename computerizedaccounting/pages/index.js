import React from "react";
import BaseCard from "../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import Asset from "../models/Asset";
import Liability from "../models/Liability";
import Expense from "../models/Expense";
import Revenue from "../models/Revenue";
import OwnersEquity from "../models/OwnersEquity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Button,
} from "@mui/material";
import OwnersDrawings from "../models/OwnersDrawings";
import ContraAsset from "../models/ContraAsset";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from "next/router";

export default function Home({
  assets,
  contraassets,
  liabilities,
  ownersequities,
  revenues,
  expenses,
  ownersdrawings,
}) {

  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete=async (e)=>{
    

    const data = "Hi"

    let res = await fetch("http://localhost:3000/api/deleteaccounts", {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if(response.success){
      toast.success("All Accounts Deleted Successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    else {
      toast.error("Something Went Wrong", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  
  return (
    <>
    <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <BaseCard>
    <div className="w-full flex justify-end">

    <Button startIcon={<DeleteIcon/>} onClick={handleClickOpen} variant="contained" color="error" sx={{mb:4,borderRadius:"16px"}}> Delete All Accounts</Button>
    </div>
      <Typography variant="h2" sx={{ fontWeight: "600" }}>
        Asset Accounts
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Account Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {asset.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {asset.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {contraassets.map((contraasset) => (
              <TableRow key={contraasset.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {contraasset.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {contraasset.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" sx={{ mt: 5, fontWeight: "600" }}>
        Liability Accounts
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Account Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {liabilities.map((liability) => (
              <TableRow key={liability.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {liability.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {liability.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" sx={{ mt: 5, fontWeight: "600" }}>
        Revenue Accounts
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Account Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {revenues.map((revenue) => (
              <TableRow key={revenue.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {revenue.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {revenue.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" sx={{ mt: 5, fontWeight: "600" }}>
        Expense Accounts
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Account Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {expense.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {expense.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" sx={{ mt: 5, fontWeight: "600" }}>
        Owner's Equity Accounts
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Account Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ownersequities.map((ownersequity) => (
              <TableRow key={ownersequity.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {ownersequity.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {ownersequity.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" sx={{ mt: 5, fontWeight: "600" }}>
        Owner's Drawings Accounts
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Account Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ownersdrawings.map((ownersdrawing) => (
              <TableRow key={ownersdrawing.accountname}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {ownersdrawing.accountname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {ownersdrawing.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3">Delete All Accounts?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete all accounts? All of your data regarding accounts will be permanently
                          removed. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CancelIcon/>} variant="outlined" color="info" onClick={handleClose}>Cancel</Button>
          <Button startIcon={<DeleteIcon/>} variant="contained" color="error" onClick={()=>{

            handleDelete()
            handleClose()
          }
          } autoFocus>
            Delete Accounts
          </Button>
        </DialogActions>
      </Dialog>
    </BaseCard>
    </>
  );
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let assets = await Asset.find();
  let contraassets = await ContraAsset.find();
  let liabilities = await Liability.find();
  let revenues = await Revenue.find();
  let expenses = await Expense.find();
  let ownersequities = await OwnersEquity.find();
  let ownersdrawings = await OwnersDrawings.find();

  return {
    props: {
      assets: JSON.parse(JSON.stringify(assets)),
      contraassets: JSON.parse(JSON.stringify(contraassets)),
      liabilities: JSON.parse(JSON.stringify(liabilities)),
      revenues: JSON.parse(JSON.stringify(revenues)),
      expenses: JSON.parse(JSON.stringify(expenses)),
      ownersequities: JSON.parse(JSON.stringify(ownersequities)),
      ownersdrawings: JSON.parse(JSON.stringify(ownersdrawings)),
    },
  };
}
