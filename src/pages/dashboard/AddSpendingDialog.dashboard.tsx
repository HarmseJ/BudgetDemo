import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';
import { DataStructure } from '../../interfaces/DataStructure.interfaces';

export default function AddSpendingDialog(props: {
  open: boolean;
  handleClose: () => void;
}) {
  const { open, handleClose } = props;
  const { budgetEntries, updateBudgetEntry } = useGlobalStateProvider();
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const firstInputRef = React.useRef<HTMLInputElement>(null);

  // Filter out cards that are NOT fixedCost, if that's your requirement
  const variedCostCards = budgetEntries.filter((card) => !card.fixedCost);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: "300px" } }}
      open={open}
      onClose={handleClose}
      slotProps={{
        transition: {
          onEntering: () => {
            // Auto-focus the first input when opening
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

            const id = Number(formJson.id);

            const inputAmount = (formJson.amount as string).trim();
            const updatedAmount = inputAmount === '' ? 0 : Number(inputAmount);

            const cardToUpdate = budgetEntries.find((card) => card.id === id);

            if (!cardToUpdate) {
              console.error(`Card with id ${id} not found.`);
              return;
            }

             const newSpentValue = (cardToUpdate.spent ?? 0) + updatedAmount;

            updateBudgetEntry({
              updatedData: {
                ...cardToUpdate,
                spent: newSpentValue,
              },
            });

            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Add Spending</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <InputLabel id="select-category-label">Select Category</InputLabel>
          <Select
            labelId="select-category-label"
            id="id"
            name="id"
            value={selectedCategory}
            label="Select Category"
            onChange={handleChange}
            ref={firstInputRef}
          >
            {variedCostCards.map((card: DataStructure) => (
              <MenuItem key={card.id} value={String(card.id)}>
                {card.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
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
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
}