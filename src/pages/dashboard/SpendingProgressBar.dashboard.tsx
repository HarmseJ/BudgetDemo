import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: { value: number }) {
  const { value } = props;

  let color: string = ""

  if (value >= 50) {
    color = "yellow"
  } if (value >= 75) {
    color = "orange"
  } if (value === 100) {
    color = "rgb(187, 0, 0)"
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress 
          variant="determinate" 
          sx={{ 
            display: 'flex',
            borderRadius: '10px',
            height: '25px',
            width: '90%',
            margin: '0 auto',
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
              borderRadius: '10px',
            },
          }} {...props} />
      </Box>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          }}
        >
        <Typography
          variant="body2"
          sx={{ color: 'black' }}
        >{`${Math.min(props.value).toFixed(1)}%`}</Typography>
      </Box>
    </Box>
  );
}

export const SpendingProgressBar = (props: { progress: number }) => {
  const { progress } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}