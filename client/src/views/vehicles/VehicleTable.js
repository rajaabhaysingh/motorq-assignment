import * as React from "react";
import clsx from "clsx";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Alert, AlertTitle } from "@material-ui/lab";

// styles
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// icons
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// components
import Loader from "../../components/loader";

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    flex: 1,
    margin: 16,
    boxSizing: "border-box",
    overflowY: "scroll",
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
  },
  fontColor: {
    color: `${theme.palette.text.primary} !important`,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: `${theme.palette.divider} !important`,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  vehicleState,
  setAddEditPaneOpen,
  setSelectedVehicleId,
  setIsEditModeOn,
  handlePageChange,
}) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const data = [];

  // implementing infinite scroll
  const onScroll = (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - 1000) {
      handlePageChange();
    }
  };

  if (vehicleState.getVehiclesData?.length > 0) {
    for (const vehicle of vehicleState.getVehiclesData) {
      data.push({
        _id: vehicle._id,
        vin: vehicle.vin,
        driver: vehicle.driver,
        customerName: vehicle.customerName,
        mmy: vehicle.mmy,
        licensePlate: vehicle.licensePlate,
        speed: vehicle.status?.speed,
        ignition: vehicle.status?.ignition ? (
          <LocalFireDepartmentIcon color="warning" />
        ) : (
          <DirectionsCarIcon color="disabled" />
        ),
      });
    }
  }

  return vehicleState.getVehiclesLoading ? (
    <Loader />
  ) : vehicleState.getVehiclesSuccessful ? (
    <div className={cls.tableWrapper} onScroll={onScroll}>
      <TableContainer>
        <Table
          sx={{ minWidth: 700 }}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>VIN</StyledTableCell>
              <StyledTableCell align="left">Driver's name</StyledTableCell>
              <StyledTableCell align="left">Customer's name</StyledTableCell>
              <StyledTableCell align="left">MMY</StyledTableCell>
              <StyledTableCell align="right">License No.</StyledTableCell>
              <StyledTableCell align="right">Speed (km/h)</StyledTableCell>
              <StyledTableCell align="right">Ignition</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow
                key={row._id}
                onClick={() => {
                  setSelectedVehicleId(row._id);
                  setAddEditPaneOpen(true);
                  setIsEditModeOn(false);
                }}
              >
                <StyledTableCell
                  className={clsx(cls.fontColor, "fwb")}
                  component="th"
                  scope="row"
                >
                  {row.vin}
                </StyledTableCell>
                <StyledTableCell className={cls.fontColor} align="left">
                  {row.driver}
                </StyledTableCell>
                <StyledTableCell className={cls.fontColor} align="left">
                  {row.customerName}
                </StyledTableCell>
                <StyledTableCell className={cls.fontColor} align="left">
                  {row.mmy}
                </StyledTableCell>
                <StyledTableCell className={cls.fontColor} align="right">
                  {row.licensePlate}
                </StyledTableCell>
                <StyledTableCell className={cls.fontColor} align="right">
                  {row.speed > 120 ? (
                    <span className={clsx(globalCls.txtErr, "fwb mar_l-4")}>
                      {row.speed}
                    </span>
                  ) : row.speed > 80 ? (
                    <span className={clsx(globalCls.txtWarn, "fwb mar_l-4")}>
                      {row.speed}
                    </span>
                  ) : (
                    <span className={clsx(globalCls.txtSucc, "fwb mar_l-4")}>
                      {row.speed}
                    </span>
                  )}
                </StyledTableCell>
                <StyledTableCell className={cls.fontColor} align="right">
                  {row.ignition}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {vehicleState.getMoreVehiclesLoading && <Loader />}
    </div>
  ) : (
    <Alert className="f1" severity="error">
      <AlertTitle>SOME ERROR OCCURED</AlertTitle>
      Please refresh this page after sometime.
    </Alert>
  );
};
