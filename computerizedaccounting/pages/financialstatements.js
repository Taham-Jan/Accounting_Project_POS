import React from "react";
import BaseCard from "../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import Asset from "../models/Asset";
import Liability from "../models/Liability";
import Expense from "../models/Expense";
import Revenue from "../models/Revenue";
import OwnersEquity from "../models/OwnersEquity";
import ContraAsset from "../models/ContraAsset";
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

const FinancialStatements = ({
  assets,
  liabilities,
  ownersequities,
  revenues,
  expenses,
  ownersdrawings,
  contraassets,
}) => {
  const revenueTotal = revenues.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);
  const expenseTotal = expenses.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);

  const netIncome = parseInt(revenueTotal - expenseTotal);

  const ownerstotal1 = ownersequities.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);

  const ownertotalafterincome = ownerstotal1 + netIncome;

  const ownersdrawingTotal = ownersdrawings.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);

  const ownersequityTotal = ownertotalafterincome - ownersdrawingTotal;

  const assetsTotal = assets.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);

  const contraassetsTotal = contraassets.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);

  const assetsTotallessdepreciation = assetsTotal - contraassetsTotal;

  const liabilitiesTotal = liabilities.reduce((accumulator, { total }) => {
    return accumulator + +total;
  }, 0);

  const liabilityownerTotal = liabilitiesTotal + ownersequityTotal;

  const currentDate = new Date();
const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  return (
    <>
      <BaseCard >
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
                <TableCell colSpan={3} align="center">
                  <Typography color="textSecondary" variant="h3">
                    TECH-DEVOTEES COMPANY
                    <br />
                    <span style={{ fontWeight: 600 }}>Income Statement</span>
                    <br />
                    For the year ended December 31, 23
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="h4">Revenue:</Typography>
                </TableCell>
              </TableRow>
              {revenues.map((revenue) => (
                <TableRow key={revenue.accountname}>
                  <TableCell>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      sx={{ ml: 3 }}
                    >
                      {revenue.accountname}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5"></Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">{revenue.total}</Typography>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="h4">Expense:</Typography>
                </TableCell>
              </TableRow>

              {expenses.map((expense) => (
                <TableRow key={expense.accountname}>
                  <TableCell>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      sx={{ ml: 3 }}
                    >
                      {expense.accountname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{expense.total}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5"></Typography>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>
                  {netIncome >= 0 ? (
                    <Typography variant="h4">Net Income (Profit)</Typography>
                  ) : (
                    <Typography variant="h4">Net Income (Loss)</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="h4"></Typography>
                </TableCell>
                <TableCell>
                {netIncome >= 0 ? (
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {netIncome}
                  </Typography>
                  ) : (
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    ({-(netIncome)})
                  </Typography>
                  )}
                  
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </BaseCard>

      <BaseCard>
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
                <TableCell colSpan={3} align="center">
                  <Typography color="textSecondary" variant="h3">
                    TECH-DEVOTEES COMPANY
                    <br />
                    <span style={{ fontWeight: 600 }}>
                      Statement of Owner's Equity
                    </span>
                    <br />
                    For the year ended December 31, 23
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ownersequities.map((ownerequity) => (
                <TableRow key={ownerequity.accountname}>
                  <TableCell>
                    <Typography color="textSecondary">
                      {ownerequity.accountname} at the start of year
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{ownerequity.total}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  {netIncome >= 0 ? (
                    <Typography variant="h5" color="textSecondary">
                      Add Net Income (Profit)
                    </Typography>
                  ) : (
                    <Typography variant="h5" color="textSecondary">
                      Less: Net Income (Loss)
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                {netIncome >= 0 ? (
                    <Typography variant="h5">
                    {netIncome}
                  </Typography>
                  ) : (
                    <Typography variant="h5">
                    ({-(netIncome)})
                  </Typography>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant="h5"></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {ownertotalafterincome}
                  </Typography>
                </TableCell>
              </TableRow>

              {ownersdrawings.map((ownersdrawing) => (
                <TableRow key={ownersdrawing.accountname}>
                  <TableCell>
                    <Typography color="textSecondary">
                      Less: {ownersdrawing.accountname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      ({ownersdrawing.total})
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}

              {ownersequities.map((ownerequity) => (
                <TableRow key={ownerequity.accountname}>
                  <TableCell>
                    <Typography color="textSecondary">
                      {ownerequity.accountname} at the end of year
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {ownersequityTotal}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseCard>

      <BaseCard>
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
                <TableCell colSpan={2} align="center">
                  <Typography color="textSecondary" variant="h3">
                    TECH-DEVOTEES COMPANY
                    <br />
                    <span style={{ fontWeight: 600 }}>Balance Sheet</span>
                    <br />
                    As of {endOfMonth.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                </TableCell>
              </TableRow>
              </TableHead>
              
              <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="" variant="h4">
                    Assets
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="" variant="h4">
                    $
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.accountname}>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ ml: 3 }}>
                      {asset.accountname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{asset.total}</Typography>
                  </TableCell>
                </TableRow>
              ))}

              {contraassets.map((contraasset) => (
                <TableRow key={contraasset.accountname}>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ ml: 3 }}>
                      Less: {contraasset.accountname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>({contraasset.total})</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Typography variant="h4" sx={{ ml: 2 }}>
                    Total Assets
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {assetsTotallessdepreciation}
                  </Typography>
                </TableCell>
              </TableRow>
            <TableRow>
              <TableCell sx={{ border: "none" }}></TableCell>
            </TableRow>
            </TableBody>

            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="" variant="h4">
                    Liabilities & Owner's Equity
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="" variant="h4">
                    $
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {liabilities.map((liability) => (
                <TableRow key={liability.accountname}>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ ml: 3 }}>
                      {liability.accountname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{liability.total}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              {ownersequities.map((ownerequity) => (
                <TableRow key={ownerequity.accountname}>
                  <TableCell sx={{ ml: 3 }}>
                    <Typography sx={{ ml: 3 }} color="textSecondary">
                      {ownerequity.accountname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{ownersequityTotal}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Typography variant="h4" sx={{ ml: 2 }}>
                    Total Liabilities & Owner's Equity
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {liabilityownerTotal}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                {liabilityownerTotal == assetsTotallessdepreciation ? (
                  <TableCell colSpan={2} align="center" sx={{border:"none"}}>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Balanced
                  </Typography>
                    
                  </TableCell>
                ) : (
                  <TableCell colSpan={2} align="center" sx={{border:"none"}}>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Unbalanced
                  </Typography>
                    
                  </TableCell>
                )}
              </TableRow>
            </TableBody>

          </Table>
        </TableContainer>
      </BaseCard>
    </>
  );
};

export default FinancialStatements;

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
