import { useGlobalStateProvider } from "../../providers/GlobalStateProvider.providers";
import { EmptyDashboard } from "./EmptyDashboard.dashboard";
import MonthlyInsights from "./MonthlyInsights.dashboard";
import Spending from "./Spending.dashboard";

export default function Dashboard() {
  const { budgetEntries } = useGlobalStateProvider();

  return (
    <>
      {
        budgetEntries.length === 0 ?
          <EmptyDashboard />
          :
          <>
            <MonthlyInsights />
            <Spending />
          </>
      }
    </>
  );
}