import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css"; 
import { Button } from "@mui/material";

export default function Carlist() {
    
    const [cars, setCars] = useState([]);

    const [colDefs] = useState ([
        { field: 'brand', filter: true},
        { field: 'model', filter: true},
        { field: 'color', filter: true},
        { field: 'fuel', filter: true, width: 100},
        { field: 'modelYear', filter: true, width: 100},
        { field: 'price', filter: true},
        { cellRenderer: params => 
        <Button size="small" color="error" onClick={() => deleteCar(params.data._links.car.href)}>
            Delete
        </Button>, width: 100 }
    ]);

    useEffect(() => {
        fetchCars();
    }, []);
    
    const fetchCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in fetch: " + response.statusText);
            } else {
                return response.json();
            }
        })
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

    return(
        <>
        <div className="ag-theme-material" style={{ height: 600, marginTop: 55 }}>
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