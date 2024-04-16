import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css"; 
import { Button } from "@mui/material";
import { getCars } from "../carAPI";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {
    
    const [cars, setCars] = useState([]);

    const [colDefs] = useState ([
        { field: 'brand', filter: true},
        { field: 'model', filter: true, width: 120},
        { field: 'color', filter: true, width: 100},
        { field: 'fuel', filter: true, width: 100},
        { field: 'modelYear', filter: true},
        { field: 'price', filter: true},
        { cellRenderer: params => <EditCar data={params.data} updateCar={updateCar} />, width: 120 },
        { cellRenderer: params => 
        <Button size="small" color="error" onClick={() => deleteCar(params.data._links.car.href)}>
            Delete
        </Button>, width: 100 }
    ]);

    useEffect(() => {
        fetchCars();
    }, []);
    
    const fetchCars = () => {
        getCars()
        .then(data => setCars(data._embedded.cars)) // koska data tulee muodossa: _embedded -> cars -> data
        .catch((err) => console.error(err));
    }

    const deleteCar = (url) => {
       if(window.confirm("Are you sure you want to delete?")){ 
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in fetch" + response.statusText);
            } else {
                return response.json();
            }
        })
        .then(() => fetchCars())
        .catch(err => console.error(err));
        }
    }

    const addCar = (newCar) => {
        console.log(newCar);
        fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newCar)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Error when adding a new car");
            } else {
                return response.json();
            } 
        })
        .then(() => fetchCars())
        .catch(err => console.error(err))
    }

    const updateCar = (url, updateCar) => {
        console.log(url);
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updateCar)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Error when updating car details");
            } else {
                return response.json();
            }
        })
        .then(() => fetchCars())
        .catch(err => console.error(err));
    }

    return(
        <>
        <AddCar addCar={addCar}/>
        <div className="ag-theme-material" style={{ height: 600 }}>
            <AgGridReact
                rowData={cars}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
        </>
    );
}