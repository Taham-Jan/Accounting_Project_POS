import React from "react";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Grid, TextField, FormControl, Button, Typography } from "@mui/material";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Account from "../models/Account";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LoginIcon from '@mui/icons-material/Login';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';



const PostEntry = ({ accounts }) => {
  const router = useRouter();
  const [accountname, setAccountname] = useState();
  const [amount, setAmount] = useState();
  const debitTemplate = { accountname: "", amount: "" };
  const [debitList, setDebitList] = useState([debitTemplate]);
  const creditTemplate = { accountname: "", amount: "" };
  const [creditList, setCreditList] = useState([creditTemplate]);
  var today = new Date();
  
  const [date, setDate] = useState(dayjs(today));
  let flag=true;
  
  
  
  
  const debitTotal=debitList.reduce((accumulator, {amount}) => {
    return accumulator+ + amount;
  }, 0);
  const creditTotal=creditList.reduce((accumulator, {amount}) => {
    return accumulator+ + amount;
  }, 0);
  
  if(debitTotal==creditTotal){
    flag=true
  }
  else{
    flag=false
  }
 

  const handleAddDebit = () => {
    setDebitList([...debitList, debitTemplate]);
  };

  const handleRemoveDebit = (index) => {
    const filtereddebitList=[...debitList];
    filtereddebitList.splice(index,1)
    setDebitList(filtereddebitList)
  };

  const handleChangeDebit = (e, index) => {
    const updatedebitList = debitList.map((list, i) =>
      index == i
        ? Object.assign(list, { [e.target.name]: e.target.value })
        : list
    );
    setDebitList(updatedebitList);
  };

  const handleAddCredit = () => {
    setCreditList([...creditList, creditTemplate]);
  };

  const handleRemoveCredit = (index) => {
    const filteredcreditList=[...creditList];
    filteredcreditList.splice(index,1)
    setCreditList(filteredcreditList)
  };

  const handleChangeCredit = (e, index) => {
    const updatecreditList = creditList.map((list, i) =>
      index == i
        ? Object.assign(list, { [e.target.name]: e.target.value })
        : list
    );
    setCreditList(updatecreditList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newDate=date.toString().slice(0,16)
    console.log(newDate)
    const data = {
      debitList,
      creditList,
      newDate
    };

    let res = await fetch("http://localhost:3000/api/postentry", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (response.success == "success") {
      toast.success("Your Entry has been Posted", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDebitList([debitTemplate])
      setCreditList([creditTemplate])
      setTimeout(() => {
        router.push("/postentry");
      }, 1000);
    } else {
      toast.error(response.error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  const handleChange = (newValue) => {
    setDate(newValue);
  };
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
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Post To Ledger" className="text-lg">
            <form onSubmit={handleSubmit} method="POST">
              <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
      
        <DesktopDatePicker
          label="Select Date"
          inputFormat="MM/DD/YYYY"
          value={date}
          name="date"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          
        />
        
        
      
    </LocalizationProvider>
                <Typography variant="h2" sx={{mb:3,mt:4}}>Debit</Typography>
                {debitList.map((debit, index) => (
                  <Grid key={index} container spacing={5} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingfabrictype">
                        Account Name
                      </InputLabel>
                      <Select
                        required
                        label="Account Name"
                        defaultValue=""
                        id="type"
                        name="accountname"
                        value={debit.accountname}
                        onChange={(e) => handleChangeDebit(e, index)}
                        labelId="selectingaccountname"
                      >
                        {accounts.map((account) => (
              <MenuItem value={account.accountname} key={account.accountname}>
                {account.accountname}
              </MenuItem>
            ))}
                        
                      </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        type="number"
                        name="amount"
                        value={debit.amount}
                        onChange={(e) => handleChangeDebit(e, index)}
                        fullWidth
                        label="Amount"
                        placeholder=""
                      />
                    </Grid>
                    {debitList.length > 1 && (
                      <Grid item xs={12} sm={2}>
                        <Button
                          sx={{ mt: 1 }}
                          variant="contained"
                          color="error"
                          size="medium"
                          onClick={() => handleRemoveDebit(index)}
                          startIcon={<RemoveCircleIcon/>}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                ))}
                <Grid item xs={12} sm={5}>
                  <Button
                    sx={{}}
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={handleAddDebit}
                    startIcon={<AddCircleIcon/>}
                  >
                    Add More
                  </Button>
                </Grid>

                <Typography variant="h2" sx={{mb:3,mt:8}}>Credit</Typography>
                {creditList.map((credit, index) => (
                  <Grid key={index} container spacing={5} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingfabrictype">
                        Account Name
                      </InputLabel>
                      <Select
                        required
                        label="Account Name"
                        defaultValue=""
                        id="type"
                        name="accountname"
                        value={credit.accountname}
                        onChange={(e) => handleChangeCredit(e, index)}
                        labelId="selectingaccountname"
                      >
                        {accounts.map((account) => (
              <MenuItem value={account.accountname} key={account.accountname}>
                {account.accountname}
              </MenuItem>
            ))}
                        
                      </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        type="number"
                        name="amount"
                        value={credit.amount}
                        onChange={(e) => handleChangeCredit(e, index)}
                        fullWidth
                        label="Amount"
                        placeholder=""
                      />
                    </Grid>
                    {creditList.length > 1 && (
                      <Grid item xs={12} sm={2}>
                        <Button
                          sx={{ mt: 1 }}
                          variant="contained"
                          color="error"
                          size="medium"
                          onClick={() => handleRemoveCredit(index)}
                          startIcon={<RemoveCircleIcon/>}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                ))}
                <Grid item xs={12} sm={5}>
                  <Button
                    sx={{}}
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={handleAddCredit}
                    startIcon={<AddCircleIcon/>}
                  >
                    Add More
                  </Button>
                </Grid>

              </CardContent>
              <Divider sx={{ mt: 1 }} />
              <CardActions style={{ padding: "16px" }}>

                {flag?<Button type="submit" size="large" sx={{}} variant="contained" startIcon={<LoginIcon/>}>
                  Post To Ledger
                </Button> :<> <Button disabled type="submit" size="large" sx={{}} variant="contained" startIcon={<LoginIcon/>}>
                  Post To Ledger
                </Button>
                <Typography variant="h5" sx={{ml:2, color:"red"}}>Debit and Credit values should be equal</Typography>
                </>
                }
                
              </CardActions>
            </form>
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default PostEntry;

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let accounts = await Account.find().sort({"accounttype":1});

  return {
    props: {
      accounts: JSON.parse(JSON.stringify(accounts)),
    },
  };
}
