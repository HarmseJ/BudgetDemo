// Librairies
import { createContext, useContext, useState } from "react";
import { DataStructure } from "../interfaces/DataStructure.interfaces";
import { DataInsertStructure } from "../interfaces/DataInsertStructure.interfaces";
import { FilterOptions } from "../enums/FilterOptions.enums";

// Mock data
// const initialMockData: DataStructure[] = [
 
// ];

// GlobalStateProvider type
export interface GlobalStateContextType {
  budgetEntries: DataStructure[]
  setBudgetEntries: React.Dispatch<React.SetStateAction<DataStructure[]>>

  insertBudgetEntry: (props: { dataToInsert: DataInsertStructure }) => Promise<void>
  deleteBudgetEntry: (id: number) => Promise<void>
  updateBudgetEntry: (props: { updatedData: DataStructure }) => Promise<void>

  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  errorMsg: string
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>

  openTab: string
  setOpenTab: React.Dispatch<React.SetStateAction<string>>

  filter: FilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;

  editorActive: boolean
  setEditorActive: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const useGlobalStateProvider = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error('useGlobalStateProvider must be used within a GlobalStateProvider')
  }
  return context
}

export const GlobalStateProvider = (props: React.PropsWithChildren) => {
  const { children } = props;

  const [budgetEntries, setBudgetEntries] = useState<DataStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [openTab, setOpenTab] = useState("savings");
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.month);
  const [editorActive, setEditorActive] = useState(false);

  // --- Mocked fetch ---
  // async function fetchBudgetEntries() {
  //   console.log("Fetching mock data...");
  //   setTimeout(() => {
  //     setBudgetEntries(initialMockData);
  //     setLoading(false);
  //   }, 500);
  // }

  async function insertBudgetEntry(props: { dataToInsert: DataInsertStructure }) {
    const newId = Math.max(...budgetEntries.map(e => e.id), 0) + 1;
    const newEntry: DataStructure = {
      ...props.dataToInsert,
      id: newId,
      spent: 0,
      currentMonth: new Date().getMonth()
    };
    setBudgetEntries(prev => [...prev, newEntry]);
    console.log("Inserted mock data:", newEntry);
  }

  async function deleteBudgetEntry(id: number) {
    setBudgetEntries(prev => prev.filter(entry => entry.id !== id));
    console.log("Deleted mock entry with id:", id);
  }

  async function updateBudgetEntry(props: { updatedData: DataStructure }) {
    setBudgetEntries(prev =>
      prev.map(entry =>
        entry.id === props.updatedData.id ? { ...entry, ...props.updatedData } : entry
      )
    );
    console.log("Updated mock entry:", props.updatedData);
  }

  // Simulated month reset
  // async function monthRestart() {
  //   console.log("Resetting spent values for non-fixed mock entries...");
  //   setBudgetEntries(prev =>
  //     prev.map(entry =>
  //       entry.fixedCost ? entry : { ...entry, spent: 0 }
  //     )
  //   );
  // }

  // async function checkAndHandleMonthChange() {
  //   const currentMonth = new Date().getMonth();
  //   const entry = budgetEntries[0];
  //   if (!entry || entry.currentMonth !== currentMonth) {
  //     await monthRestart();
  //     setBudgetEntries(prev =>
  //       prev.map(e => ({ ...e, currentMonth }))
  //     );
  //   }
  // }

  // useEffect(() => {
  //   fetchBudgetEntries();
  //   const intervalId = setInterval(fetchBudgetEntries, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <GlobalStateContext.Provider value={{
      budgetEntries,
      setBudgetEntries,
      insertBudgetEntry,
      deleteBudgetEntry,
      updateBudgetEntry,
      loading,
      setLoading,
      errorMsg,
      setErrorMsg,
      openTab,
      setOpenTab,
      filter,
      setFilter,
      editorActive,
      setEditorActive,
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}


// // Librairies
// import { createContext, useContext, useState } from "react";
// import { DataStructure } from "../interfaces/DataStructure.interfaces";
// import { DataInsertStructure } from "../interfaces/DataInsertStructure.interfaces";
// import { FilterOptions } from "../enums/FilterOptions.enums";
// import { supabase } from "../utils/supabaseClient";
// import { TabTexts } from "../enums/TabTexts.enum";

// // GlobalStateProvider type
// export interface GlobalStateContextType {
//   // Incoming data
//   budgetEntries: DataStructure[]
//   setBudgetEntries: React.Dispatch<React.SetStateAction<DataStructure[]>>

//   // Insert data
//   insertBudgetEntry: (props: { dataToInsert: DataInsertStructure }) => Promise<void>
//   // Delete data
//   deleteBudgetEntry: (id: number) => Promise<void>
//   // Update data
//   updateBudgetEntry: (props: { updatedData: DataStructure }) => Promise<void>

//   // Loading state
//   loading: boolean
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>
//   errorMsg: string
//   setErrorMsg: React.Dispatch<React.SetStateAction<string>>

//   // open editor tab
//   activeTab: TabTexts;
//   setActiveTab: React.Dispatch<React.SetStateAction<TabTexts>>;

//   // Month/week/day filter options
//   filter: FilterOptions;
//   setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;

//   // Demo cards
//   cards: Record<TabTexts, DataStructure[]>;
//   setCards: React.Dispatch<React.SetStateAction<Record<TabTexts, DataStructure[]>>>;
// }

// // Create the context
// const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// // Custom hook to use the shared data context
// export const useGlobalStateProvider = () => {
//   const context = useContext(GlobalStateContext)
//   if (!context) {
//     throw new Error('useGlobalStateProvider must be used within a GlobalStateProvider')
//   }
//   return context
// }

// // Provider component to wrap the app and provide the shared state
// export const GlobalStateProvider = (props: React.PropsWithChildren) => {
//   const { children } = props
//   // Incoming data
//   const [budgetEntries, setBudgetEntries] = useState<DataStructure[]>([])
//   // Loading state
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
//   // open editor tab
//   const [activeTab, setActiveTab] = useState<TabTexts>(TabTexts.Savings);

//   // Month/week/day filter options
//   const [filter, setFilter] = useState<FilterOptions>(FilterOptions.month);

//   // Demo cards (for illustration purposes)
//   const [cards, setCards] = useState<Record<TabTexts, DataStructure[]>>({
//     [TabTexts.Savings]: [],
//     [TabTexts.monthlyEarnings]: [],
//     [TabTexts.monthlyExpenses]: [],
//     [TabTexts.monthlyDebt]: [],
//   });

//   async function fetchBudgetEntries() {
//     console.log("Fetching data...");

//     const { data, error } = await supabase
//       .from('budget_entries')
//       .select('*');

//     if (error) {
//       console.error("Error fetching data:", error.message);
//       setErrorMsg(error.message);
//     } else {
//       console.log("Fetched data successfully:");
//       setBudgetEntries(data);
//     }
//     setLoading(false);
//   }

//   async function insertBudgetEntry(props: { dataToInsert: DataInsertStructure }) {
//     const { dataToInsert } = props;
//     const { data, error } = await supabase
//       .from('budget_entries')
//       .insert(
//         { title: dataToInsert.title, amount: dataToInsert.amount, fixedCost: dataToInsert.fixedCost, category: dataToInsert.category },
//       );

//     if (error) {
//       console.error("Error inserting data:", error.message);
//     } else {
//       console.log("Inserted data successfully:", data);
//       fetchBudgetEntries(); // Refresh the list after insertion
//     }
//   }

//   async function deleteBudgetEntry(id: number) {
//     const { error } = await supabase
//       .from('budget_entries')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       console.error("Error deleting data:", error.message);
//     } else {
//       console.log("Deleted data successfully");
//       fetchBudgetEntries(); // Refresh the list after deletion
//     }
//   }

//   async function updateBudgetEntry(props: { updatedData: DataStructure }) {
//     const { updatedData } = props;
//     const { error } = await supabase
//       .from('budget_entries')
//       .update(
//         { title: updatedData.title, amount: updatedData.amount, fixedCost: updatedData.fixedCost, category: updatedData.category, spent: updatedData.spent }
//       )
//       .eq('id', updatedData.id);

//     if (error) {
//       console.error("Error updating data:", error.message);
//     } else {
//       console.log("Updated data successfully");
//       fetchBudgetEntries(); // Refresh the list after update
//     }
//   }

//   // Clears 'spent' for all non-fixed entries
//   // async function monthRestart() {
//   //   console.log("Month restart triggered: resetting spent values for non-fixed entries.");

//   //   const { error } = await supabase
//   //     .from("budget_entries")
//   //     .update({ spent: 0 })
//   //     .eq("fixedCost", false);

//   //   if (error) {
//   //     console.error("Error resetting monthly spent values:", error.message);
//   //   } else {
//   //     console.log("Monthly spent values reset for non-fixed entries.");
//   //     fetchBudgetEntries(); // Refresh
//   //   }
//   // }

//   // Checks whether a new month has arrived (compares DB's stored month vs. actual current month)
//   // async function checkAndHandleMonthChange() {
//   //   const currentMonth = new Date().getMonth(); // 0-based

//   //   // Fetch one row that has the stored month (or fetch all if needed).
//   //   // Here, we'll just look at the first entry, but adjust as necessary:
//   //   const { data, error } = await supabase
//   //     .from("budget_entries")
//   //     .select("currentMonth")
//   //     .limit(1);

//   //   if (error) {
//   //     console.error("Error fetching currentMonth from DB:", error.message);
//   //     return;
//   //   }

//   //   // If there are entries, check the first one's month
//   //   if (data && data.length > 0) {
//   //     const storedMonth = data[0].currentMonth;

//   //     if (storedMonth !== currentMonth) {
//   //       // We have a new month => reset spent
//   //       await monthRestart();

//   //       // After resetting, update all entries to the new month so we don't reset again
//   //       const { error: updateError } = await supabase
//   //         .from("budget_entries")
//   //         .update({ currentMonth })
//   //         .neq("currentMonth", currentMonth); // only update those that differ

//   //       if (updateError) {
//   //         console.error("Error updating currentMonth after reset:", updateError.message);
//   //       }
//   //     }
//   //   } else {
//   //     // If no entries exist yet, nothing to reset; or you might insert default data
//   //     // Or if you want to set all to currentMonth for an empty table:
//   //     await supabase.from("budget_entries").update({ currentMonth });
//   //   }
//   // }

//   // useEffect(() => {
//   //   // 1) Check if we need a month reset
//   //   checkAndHandleMonthChange();
//   //   // 2) Fetch data
//   //   fetchBudgetEntries();

//   //   // Optionally poll for new data
//   //   const intervalId = setInterval(fetchBudgetEntries, 5000);
//   //   return () => clearInterval(intervalId);
//   // }, []);

//   return (
//     <GlobalStateContext.Provider value={{
//       // Incoming data
//       budgetEntries,
//       setBudgetEntries,
//       // Insert data
//       insertBudgetEntry,
//       // Delete data
//       deleteBudgetEntry,
//       // Update data
//       updateBudgetEntry,
//       // Loading state
//       loading,
//       setLoading,
//       errorMsg,
//       setErrorMsg,
//       // open editor tab
//       activeTab,
//       setActiveTab,
//       // Month/week/day filter options
//       filter,
//       setFilter,
//       // Demo cards
//       cards,
//       setCards,
//     }}
//     >
//       {children}
//     </GlobalStateContext.Provider>
//   )
// }