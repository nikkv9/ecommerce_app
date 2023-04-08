import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStepp }) => {
  const steps = [
    {
      label: <p>Shipping Details</p>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <p>Confirm Order</p>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <p>Payment</p>,
      icon: <AccountBalanceIcon />,
    },
  ];
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStepp}>
        {steps.map((s, idx) => (
          <Step key={idx}>
            <StepLabel
              icon={s.icon}
              style={{
                color: activeStepp >= idx ? "tomato" : "gray",
              }}
            >
              {s.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
