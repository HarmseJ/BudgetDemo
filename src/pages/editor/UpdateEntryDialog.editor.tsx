import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { DataStructure } from '../../interfaces/DataStructure.interfaces';
import { FormatNumberWithCommas } from '../../components/FormatNumberWithCommas.components';

export default function UpdateEntryDialog(props: {
  open: boolean,
  handleClose: () => void,
  cardData: DataStructure
}) {
  const { open, handleClose, cardData } = props;
  const [fixedCost, setFixedCost] = React.useState<boolean>(true);
  const { openTab, updateBudgetEntry } = useGlobalStateProvider();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            // Trim the inputs and check if they are empty
            const inputName = formJson.name.toString().trim();
            const inputAmount = formJson.amount.toString().trim();

            // Use the existing values if inputs are empty
            const updatedName = inputName === "" ? cardData.title : inputName;
            const updatedAmount = inputAmount === "" ? cardData.amount : Number(inputAmount);

            updateBudgetEntry({
              updatedData: {
                id: cardData.id,
                title: updatedName,
                amount: updatedAmount,
                fixedCost: fixedCost,
                category: openTab ?? cardData.category,
                spent: cardData.spent,
                currentMonth: cardData.currentMonth,
              },
            });
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Edit Entry</DialogTitle>
      <DialogContent>
        <TextField
          autoComplete='on'
          margin="dense"
          id="name"
          name="name"
          label={`Current Name: ${cardData.title}`}
          type="string"
          fullWidth
          variant="standard"
        />
        <TextField
          autoComplete='on'
          margin="dense"
          id="amount"
          name="amount"
          label={`Current Amount: $${FormatNumberWithCommas(cardData.amount)}`}
          type="number"
          fullWidth
          variant="standard"
          slotProps={{
            htmlInput: {
              step: "0.01", // or "any" for arbitrary decimals
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-around" }}>
          <Box flexDirection="column">
            <FormControlLabel
              control={
                <Checkbox
                  checked={fixedCost === true}
                  onChange={() => setFixedCost(true)}
                />
              }
              label="Fixed Cost"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fixedCost === false}
                  onChange={() => setFixedCost(false)}
                />
              }
              label="Variable Cost"
            />
            <Box display="flex" justifyContent={"space-around"}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </Box>
          </Box>
      </DialogActions>
    </Dialog>
  );
}