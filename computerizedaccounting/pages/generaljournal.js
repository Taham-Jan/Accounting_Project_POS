import React from "react";
import BaseCard from "../src/components/baseCard/BaseCard";

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
import Journal from "../models/Journal";
import mongoose from "mongoose";

const GeneralJournal = ({ journalentries }) => {
  
  return (
    <>
      <BaseCard title="General Journal">
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
                  <Typography color="textSecondary" variant="h3">
                    S.No
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="textSecondary" variant="h3">
                    Date
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="textSecondary" variant="h3">
                    Description
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="textSecondary" variant="h3">
                    Debit
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="textSecondary" variant="h3">
                    Credit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            
              {journalentries.map((journalentry, i) => (
                <TableBody key={i}>
                  {journalentry.debitList.map((debit, index) => (
                    <TableRow key={index}>
                      {index==0 &&<>
                      <TableCell align="center" sx={{borderRight:"1px solid rgba(224, 224, 224, 1)",borderLeft:"1px solid rgba(224, 224, 224, 1)"}} rowSpan={journalentry.debitList.length+journalentry.creditList.length}>
                        <Typography variant="h4">{i + 1}</Typography>
                      </TableCell>
                      
                      <TableCell align="center" sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}}  rowSpan={journalentry.debitList.length+journalentry.creditList.length}>
                        <Typography>{journalentry.date}</Typography>
                      </TableCell>
                      </>
                      }
                      <TableCell sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}} >
                        <Typography>{debit.accountname}</Typography>
                      </TableCell>
                      <TableCell sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}} >
                        <Typography >{debit.amount}</Typography>
                      </TableCell>
                      <TableCell sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}} >
                        <Typography></Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  {journalentry.creditList.map((credit, index) => (
                    <TableRow key={index}>
                      
                      <TableCell sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}} >
                        <Typography sx={{ ml: 5 }}>
                          {credit.accountname}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}} >
                        <Typography >
                          
                        </Typography>
                      </TableCell>
                      <TableCell sx={{borderRight:"1px solid rgba(224, 224, 224, 1)"}} >
                        <Typography>
                          {credit.amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5} >
                      <Typography></Typography>
                    </TableCell>
                  </TableRow>
                  
                  </TableBody>
              ))}
            
          </Table>
        </TableContainer>
      </BaseCard>
      
    </>
  );
};

export default GeneralJournal;

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let journalentries = await Journal.find();

  return {
    props: {
      journalentries: JSON.parse(JSON.stringify(journalentries)),
    },
  };
}
