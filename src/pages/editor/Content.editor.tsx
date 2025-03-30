import { Grid2, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { AddEntry } from "./AddEntry.editor";
import ContentCard from "./ContentCard.editor";
import { useGlobalStateProvider } from "../../providers/GlobalStateProvider.providers";
import { DataStructure } from "../../interfaces/DataStructure.interfaces";
import { FormatNumberWithCommas } from "../../components/FormatNumberWithCommas.components";

export default function Content() {
  const { openTab, budgetEntries } = useGlobalStateProvider();

  const filteredCards = budgetEntries.filter((card: DataStructure) => card.category === openTab);

  // total amount for each card in filteredCards
  const totalAmount = filteredCards.reduce((acc: number, card: DataStructure) => {
    return acc + card.amount;
  }, 0);

  const totalAmountFormatted = FormatNumberWithCommas(totalAmount);

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "50px 50px 0px 0px",
        bgcolor: "rgb(26, 26, 26)",
        color: "white",
        minHeight: "100%",
        height: "fit-content",
        flex: 1,
        padding: 1,
      }}
    >
      <>
        <AddEntry />

        <Typography 
          fontSize={{
            xs: "1.5rem",
            xl: "2rem",
          }} 
          textAlign={"center"}
          padding={0}
          margin={0}
        >
          Total {openTab.charAt(0).toUpperCase() + openTab.slice(1)}: 
        </Typography>

        <Typography 
          fontSize={{
            xs: "1.5rem",
            xl: "2rem",
          }} 
          color="lightblue" 
          textAlign={"center"}
          paddingBottom={2}
          margin={0}
        >
          ${totalAmountFormatted}
        </Typography>

        <Grid2
          container
        >

          {filteredCards.map((card: DataStructure) => {
            return (
              <Grid2
                key={card.id}
                size={6}
              >
                <ContentCard
                  cardData={card}
                />
              </Grid2>
            );
          })}
        </Grid2>
      </>
    </Box>
  );
}