import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AddCar({addCar}) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
        setCar({
            brand: '',
            model: '',
            color: '',
            fuel: '',
            modelYear: '',
            price: ''
        });
    }

    const handleClickSave = () => {
        addCar(car);
        handleClickClose();
    }

    return (
        <>
        <Button variant='outlined' onClick={handleClickOpen} sx={{ margin: '5px' }}>Add car</Button>
        <Dialog
        open={open}
        onClose={handleClickClose}
        >
        <DialogTitle>Add new car information</DialogTitle>
        <DialogContent>
            <DialogContentText>Fill in all information and press Save. Press cancel to exit without saving.</DialogContentText>
            <TextField
            required
            margin='dense'
            label='Brand'
            value={car.brand}
            onChange={e => setCar({...car, brand: e.target.value})}
            fullWidth
            variant='standard'
            />
            <TextField
            required
            margin='dense'
            label='Model'
            value={car.model}
            onChange={e => setCar({...car, model: e.target.value})}
            fullWidth
            variant='standard'
            />
            <TextField
            required
            margin='dense'
            label='Color'
            value={car.color}
            onChange={e => setCar({...car, color: e.target.value})}
            fullWidth
            variant='standard'
            />
           <TextField
            required
            margin='dense'
            label='Fuel'
            value={car.fuel}
            onChange={e => setCar({...car, fuel: e.target.value})}
            fullWidth
            variant='standard'
            />
            <TextField
            required
            margin='dense'
            label='Year'
            value={car.modelYear}
            onChange={e => setCar({...car, modelYear: e.target.value})}
            fullWidth
            variant='standard'
            />
            <TextField
            required
            margin='dense'
            label='Price'
            value={car.price}
            onChange={e => setCar({...car, price: e.target.value})}
            fullWidth
            variant='standard'
            />
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' color='error' onClick={handleClickClose}>Cancel</Button>
            <Button variant='outlined' onClick={handleClickSave}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    );
}