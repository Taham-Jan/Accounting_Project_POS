import React from "react";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Grid, TextField, FormControl, Button } from "@mui/material";
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

const AddAccount = () => {
  const router = useRouter();
  const [accountname, setAccountname] = useState();
  const [accounttype, setAccounttype] = useState();
  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    if (e.target.name == "accountname") {
      setAccountname(e.target.value);
    } else if (e.target.name == "accounttype") {
      setAccounttype(e.target.value);
    } else if (e.target.name == "total") {
      setTotal(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      accountname,
      accounttype,
      total,
    };

    let res = await fetch("http://localhost:3000/api/addaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success == "success") {
      toast.success("Your Account Has Been Added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/addaccount");
      }, 2000);
    } else {
      toast.error(response.error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
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
          <BaseCard title="Add an Account" className="text-lg">
            <form onSubmit={handleSubmit} method="POST">
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="accountname"
                      name="accountname"
                      value={accountname ? accountname : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Account Name"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingfabrictype">
                        Account Type
                      </InputLabel>
                      <Select
                        required
                        label="Account Type"
                        defaultValue=""
                        id="type"
                        name="accounttype"
                        onChange={handleChange}
                        labelId="selectingaccounttype"
                      >
                        <MenuItem value="Asset">Asset</MenuItem>
                        <MenuItem value="Contra Asset">Contra Asset</MenuItem>
                        <MenuItem value="Liability">Liability</MenuItem>
                        <MenuItem value="Revenue">Revenue</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                        <MenuItem value="Owner's Equity">
                          Owner's Equity
                        </MenuItem>
                        <MenuItem value="Owner's Drawings">
                          Owner's Drawings
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      type="number"
                      required
                      id="total"
                      name="total"
                      value={total}
                      onChange={handleChange}
                      // fullWidth
                      label="Amount"
                      placeholder=""
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
              <CardActions style={{ padding: "16px" }}>
                <div className="w-full flex justify-center">
                  <Button
                    size="large"
                    type="submit"
                    sx={{
                      width: "20%",
                      backgroundColor: "#617A55",
                      "&:hover": {
                        backgroundColor: "#A4D0A4",
                      },
                    }}
                    variant="contained"
                  >
                    Add Account
                  </Button>
                </div>
              </CardActions>
            </form>
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AddAccount;
