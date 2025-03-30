import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';

export default function NavigationTabs() {
  const { openTab, setOpenTab } = useGlobalStateProvider();

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setOpenTab(newValue);
  };

  return (
    <Box
      paddingTop={1}
      height={"120px"}
      color={"white"}
    >
      <Tabs
        value={openTab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Tabs"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          '& .MuiTabs-flexContainer': {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            color: 'white',
          }
        }}
      >
        <Tab value="savings" label="Savings" sx={{ color: "white" }}/>
        <Tab value="earnings" label="Earnings" sx={{ color: "white" }}/>
        <Tab value="expenses" label="Expenses" sx={{ color: "white" }}/>
        <Tab value="debt" label="Debt" sx={{ color: "white" }}/>
        {/* <Tab value="miscellaneous" label="Miscellaneous" /> */}
      </Tabs>
    </Box>
  );
}