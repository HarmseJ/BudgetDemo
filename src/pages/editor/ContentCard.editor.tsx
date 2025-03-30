import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataStructure } from '../../interfaces/DataStructure.interfaces';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';
import UpdateEntryDialog from './UpdateEntryDialog.editor';
import React from 'react';
import { FormatNumberWithCommas } from '../../components/FormatNumberWithCommas.components';

export default function ContentCard(props: { cardData: DataStructure }) {
  const { cardData } = props;

  const { deleteBudgetEntry } = useGlobalStateProvider();
  const [openEdit, setOpenEdit] = React.useState(false);
  
    const handleOpen = () => {
      setOpenEdit(true);
    };
  
    const handleClose = () => {
      setOpenEdit(false);
    };
    
  return (
    <Card
      variant="elevation"
      elevation={4}
      sx={{
        bgcolor: "rgb(21, 21, 21)",
        borderRadius: "20px",
        margin: {
          xs: "10px 10px",
          md: "25px 200px",
        },
        "&:hover": {
          transform: "scale(1.01)",
          transition: "transform 0.2s ease-in-out",
          boxShadow: "0px 0px 10px 5px rgba(44, 44, 44, 0.45)",
        }
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          textAlign: "center",
          minHeight: "150px",
          maxHeight: "150px",
          fontSize: "15px",
          width: "100%",
        }}
      >
        {/* title */}
        <Typography
          letterSpacing={0}
          sx={{
            color: 'white',
            // fontSize: {
            //   xs: "1.25rem",
            //   sm: "1.5rem",
            //   md: "1.75rem",
            //   lg: "1.8rem",
            // }
            // fontSize: "autorem",
          }}
        >
          {cardData.title}
        </Typography>

        <Divider
          sx={{
            borderColor: 'white',
            width: "100%",
            marginTop: 0.5
          }}
        />

        {/* amount */}
        <Typography
          // variant="body2"
          color='white'
          // fontSize={"2.5rem"}
          letterSpacing={2}
          padding={0}
          margin={0}
        >
          ${FormatNumberWithCommas(cardData.amount)}
        </Typography>

        {/* fixed cost (boolean) */}
        <Typography
          sx={{
            color: 'lightblue',
            // fontSize: "0.7rem"
          }}
        >
          {cardData.fixedCost ? "Fixed Cost" : "Variable Cost"}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-around",
          bgcolor: "rgb(34, 34, 34)",
        }}
      >
        <Button
          onClick={handleOpen}
          size="small"
          fullWidth
          sx={{
            borderRadius: "10px",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgb(28, 28, 28)",
              color: "white",
            },
          }}
        >
          <Edit
            sx={{
              mr: 0.5,
              color: 'inherit',
              // fontSize: "1.25rem"
            }}
          />
        </Button>

        <Divider
          orientation="vertical"
          flexItem
          variant='fullWidth'
          sx={{ bgcolor: 'grey.800' }}
        />

        <Button
          onClick={
            () => {
              if (window.confirm("Are you sure you want to delete this entry?")) {
                deleteBudgetEntry(cardData.id);
              }
            }
          }
          size="small"
          fullWidth
          sx={{
            borderRadius: "10px",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(89, 41, 41, 0.5)",
              color: "white",
            },
          }}
        >
          <Delete
            sx={{
              mr: 0.5,
              color: 'inherit',
              // fontSize: "1.25rem"
            }}
          />
        </Button>
      </CardActions>

      {<UpdateEntryDialog open={openEdit} handleClose={handleClose} cardData={cardData} />}
    </Card>
  );
}