import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGlobalStateProvider } from "../../providers/GlobalStateProvider.providers";
import CustomAppBar from "./CustomAppBar.dashboard";
import MonthlyInsightsCard from "./MonthlyInsightsCards.dashboard";
import { InsightsCardStructure } from "../../interfaces/InsightsCardStructure.interfaces";

export default function MonthlyInsights() {
  const { budgetEntries } = useGlobalStateProvider();

  // Filter data by category
  const earningsCards = budgetEntries.filter(entry => entry.category === 'earnings');
  const expensesCards = budgetEntries.filter(entry => entry.category === 'expenses');
  const debtCards = budgetEntries.filter(entry => entry.category === 'debt');
  const savingsCards = budgetEntries.filter(entry => entry.category === 'savings');

  // Calculate totals based on filtered entries
  const totalSavings = savingsCards.reduce((acc, entry) => acc + entry.amount, 0);
  const totalEarnings = earningsCards.reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpenses = expensesCards.reduce((acc, entry) => acc + entry.amount, 0);
  const remainingMoney = totalEarnings - totalExpenses;
  // const totalMiscellaneous = (remainingMoney / 100) * 8;
  const totalDebt = debtCards.reduce((acc, entry) => acc + entry.amount, 0);
  // const monthlyDebtPayment = totalDebt > 0 ? remainingMoney - totalMiscellaneous : 0;
  const monthlyDebtPayment = totalDebt > 0 ? remainingMoney : 0;
  const timeToPayOffDebt = monthlyDebtPayment > 0 ? totalDebt / monthlyDebtPayment : 0;

  const cardData: InsightsCardStructure[] = [
    { title: "Savings", amount: totalSavings, color: "lightgreen" },
    { title: "Earnings", amount: totalEarnings, color: "lightgreen" },
    { title: "Expenses", amount: totalExpenses, color: "red" },
    { title: "Debt", amount: totalDebt, color: "red" },
    { title: "Debt Payment", amount: monthlyDebtPayment, color: "orange" },
    { title: "Debt Repayment", amount: timeToPayOffDebt, color: "orange" }
  ]

  return (
    <>
      <Box
        className="monthly-insights"
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        height={"fit-content"}
        minHeight={"fit-content"}

        // maxHeight={"100%"}
        // bgcolor={"rgb(30, 31, 32)"}
      >
        <CustomAppBar />
        <Typography paddingTop={1} sx={{
          fontSize: {
            xs: "1.2rem",
            lg: "1.5rem",
          },
        }}>Monthly Insights</Typography>

        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          height={"100%"}
        >
          {cardData.map((card, index) => {
            return (
              <MonthlyInsightsCard key={index} cardData={card} />
            );
          })}
        </Box>
      </Box>
    </>
  );
}
