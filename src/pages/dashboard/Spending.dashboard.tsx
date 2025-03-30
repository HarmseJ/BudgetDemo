import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { SpendingCard } from "./SpendingCard.dashboard";
import { useGlobalStateProvider } from "../../providers/GlobalStateProvider.providers";
import { AddSpending } from "./AddSpending.dashboard";

export default function Spending() {
  const { budgetEntries } = useGlobalStateProvider();

  // all cards that are not fixed costs
  const variedCostCards = budgetEntries.filter((card) => !card.fixedCost);

  return(
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
      bgcolor={"rgb(16, 16, 16)"}
      height={
        {
          xs: "100%",
          sm: "fit-content",
          md: "100%",
          lg: "100%",
          xl: "100%",
        }
      }
      minHeight={"fit-content"}
      borderRadius={"50px 50px 0px 0px"}
      boxShadow={"0px -15px 50px 5px rgba(0, 0, 0, 0.5)"}
      marginTop={"20px"}
    >
      <AddSpending />
      <Typography 
        variant="h5"
        color="rgb(198, 198, 198)"
      >
        Spent this Month
        </Typography>

      <SpendingCard card={variedCostCards}/>
    </Box>
  );
}