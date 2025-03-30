import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { FormatNumberWithCommas } from '../../components/FormatNumberWithCommas.components';
import { InsightsCardStructure } from '../../interfaces/InsightsCardStructure.interfaces';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';

export default function MonthlyInsightsCard(props: { cardData: InsightsCardStructure }) {
  const { cardData } = props;
  const { filter } = useGlobalStateProvider();

  const formatTimeToPayOffDebt = (monthsDecimal: number) => {
    if (monthsDecimal <= 0) return "Paid off";
    const months = Math.floor(monthsDecimal);
    const days = Math.round((monthsDecimal - months) * 30);
    return months < 1 ? `${days} days` : days === 0 ? `${months} months` : `${months} months & ${days} days`;
  };

  // Time to Pay Off Debt
  // debt repayment.

  return (
    <Card
      variant="elevation"
      elevation={4}
      sx={{
        bgcolor: "rgb(21, 21, 21)",
        borderRadius: "10px",
        gap: "10px",
        margin: {
          xs: "10px 10px",
          sm: "10px 20px",
          md: "25px 150px",
          lg: "15px 50px",
          xl: "10px 100px",
        },
        width: {
          xs: "175px",
          lg: "280px",
        },
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.5)"
      }}
    >
      <CardContent
        color={cardData.color}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignContent: "space-between",
          textAlign: "center",
          height: {
            xs: "90px",
            lg: "100px",
          },
          color: `${cardData.color}`,
          fontSize: "autorem"
        }}
      >
        {/* title */}
        <Typography
          fontWeight="bold"
          // fontSize={{
          //   xs: "0.8rem",
          //   lg: "1.15rem",
          // }}
        >
          {cardData.title}
        </Typography>

        <Divider
          sx={{
            borderColor: 'white',
            width: "100%",
          }}
        />

        {/* amount */}
        <Typography
          color="grey.400"
          // fontSize={{
          //   xs: "1.0rem",
          //   lg: "1.1rem",
          // }}
        >
          
          {cardData.title === "Debt Repayment" ? formatTimeToPayOffDebt(cardData.amount) : `$${FormatNumberWithCommas(cardData.amount)}`}

          {cardData.title !== "Savings" && cardData.title !== "Debt Repayment" && cardData.title !== "Debt" && (
            <Typography
              component={"span"}
              color="grey.600"
              // fontSize={{
              //   xs: "0.9rem",
              //   lg: "1.1rem",
              // }}
            >
              /{filter}
            </Typography>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}