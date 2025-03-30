import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

export default function AddEntryDialog(props: {
  open: boolean,
  handleEntryClose: () => void,
}) {
  const { open, handleEntryClose } = props;
  const [fixedCost, setFixedCost] = React.useState<boolean>(true);
  const { openTab, insertBudgetEntry } = useGlobalStateProvider();
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Dialog
      open={open}
      onClose={handleEntryClose}
      slotProps={{
        transition: {
          onEntering: () => {
            if (firstInputRef.current) {
              firstInputRef.current.focus();
            }
          },
        },
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name.toString();
            const amount = Number(formJson.amount);
            insertBudgetEntry({
              dataToInsert: {
                title: name,
                amount: amount,
                fixedCost: fixedCost,
                category: openTab,
              },
            });
            handleEntryClose();
          },
        },
      }}
    >
      <DialogTitle>Add Entry</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={firstInputRef}
          autoComplete='on'
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="string"
          fullWidth
          variant="standard"
        />
        <TextField
          autoComplete='on'
          required
          margin="dense"
          id="amount"
          name="amount"
          label="Amount"
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
        {openTab === "expenses" ? (
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
              <Button onClick={handleEntryClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </Box>
          </Box>
        ) : (
          <>
            <Button onClick={handleEntryClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
