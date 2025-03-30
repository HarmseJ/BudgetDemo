import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SpendingProgressBar } from './SpendingProgressBar.dashboard';
import { DataStructure } from '../../interfaces/DataStructure.interfaces';
import { FormatNumberWithCommas } from '../../components/FormatNumberWithCommas.components';


export const SpendingCard = (props: { card: DataStructure[] }) => {
  const { card } = props;

  const variedCostCards = card

  const spentPercentage = (budgetAmount: number, spentAmount: number | undefined): number => {
    const maxBudget = budgetAmount;
    const amountSpent = spentAmount;
    if (maxBudget <= 0) return 0; // Prevent division by zero
    if (amountSpent === undefined) return 0; // Handle undefined spent amount
    const spent = (amountSpent / maxBudget) * 100;
    return Math.min(spent, 100); // Never exceed 100%
  };

  return (
    variedCostCards.map((card: DataStructure) => (

      <Card key={card.id}
        sx={{
          textAlign: "center",
          width: {
            xs: '60%',
            md: '40%',
          },
          margin: 2,
          padding: {
            xs: 1,
            sm: 8,
            md: 2,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: '100%',
          height: 'fit-content', // Adjust height to fit content
          bgcolor: "rgb(39, 39, 39)",
          boxShadow: "0px 3px 15px 0px rgba(44, 44, 44, 0.5)",
          // marginBottom: 2,
          borderRadius: 5,

        }}
      >
        {/* <CardContent> */}
          <Typography
            variant="h5"
            color="rgb(185, 185, 185)"

          >
            {card.title}
          </Typography>

          <Typography
            variant="body1"
            margin="5px"
          >
            <Typography component="span" sx={{ color: "rgb(181, 46, 46)", fontWeight: "bold" }}>
              {/* ${FormatNumberWithCommas(card.spent)} */}
              ${FormatNumberWithCommas(parseFloat(card.spent.toFixed(2)))}
            </Typography>
            <Typography component="span" sx={{ color: "rgb(154, 154, 154)", fontWeight: "bold", margin: "0px 5px" }}>
              of
            </Typography>
            <Typography component="span" sx={{ color: "rgb(49, 167, 65)", fontWeight: "bold" }}>
              ${Number(card.amount).toLocaleString("en-US")}
            </Typography>
          </Typography>


          <SpendingProgressBar progress={spentPercentage(card.amount, card.spent)} />
        {/* </CardContent> */}
      </Card>
    ))
  );
};