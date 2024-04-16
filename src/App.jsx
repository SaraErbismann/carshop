import Carlist from './components/Carlist';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function App() {


  
  return (
    <Container maxWidth="xl">
      <Paper>
      <AppBar position="static">
        <Toolbar >
          <Typography variant='h6'>Car shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
      </Paper>
    </Container>
  )
}

export default App
