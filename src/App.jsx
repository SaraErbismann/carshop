import Carlist from './components/Carlist';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  console.log(import.meta.env.VITE_API_URL);
  
  return (
    <Container maxWidth="xl">
      <AppBar>
        <Toolbar position="static">
          <Typography variant='h6'>Car shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </Container>
  )
}

export default App
