import React, { useEffect, useState } from 'react';
import { getAllCities,getReservationById,getAllServices } from '../services/globalApi.services';
import { useParams } from 'react-router-dom';
import {
  createReservation,
  updateReservation,
} from "../services/globalApi.services";

function ReservationForm({existingData}) {
  const [reservation, setReservation] = useState(
    existingData||{
      fechaIngreso: "",
      fechaSalida: "",
      cantPersonas: "",
      ciudad: { idCiudad: "" },
      persona: { idUsuario: "" },
      servicio: { idServicio: "" },
    }
  );


  const [cities,setCities] = useState(
    [{
      idCiudad:"",
      ciudad:""
    }]
  );
  
  const citiesList = async () =>{
    const response = await getAllCities();
    setCities(response.data);
  }

  const serviceList = async() =>{
    const response = await getAllServices();
    setService(response.data);
  }

  const reservaObj = async() =>{
    const response = await getReservationById(id);
    setReservation(response.data); 
  }

  const handleSubmit = () => {
    if (isEdit) {
      updateReservation(reservation).then(() => alert("Reservation updated!"));
    } else {
      console.log(reservation);
      createReservation(reservation).then(() => alert("Reservation created!"));
    }
  };

  const [services ,setService]=useState([{
    idServicio: "",
    tipoHabitacion: "",
    precio :""
  }])

  const {id}=useParams();
  const isEdit = !!id

  useEffect(()=>{
    reservaObj();
  },[id])

  useEffect(()=>{
    citiesList();
    serviceList();
  },[])

  useEffect(()=>{
    serviceList();
  },[])



  return (
    <div className="max-w-4xl mx-96 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Reservation" : "Create Reservation"}
      </h2>

      {/* Fecha Ingreso */}
      <label className="block text-sm font-medium text-gray-700">
        Check-in Date
      </label>
      <input
        type="date"
        value={reservation.fechaIngreso}
        onChange={(e) =>
          setReservation({ ...reservation, fechaIngreso: e.target.value })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
      />

      {/* Fecha Salida */}
      <label className="block text-sm font-medium text-gray-700">
        Check-out Date
      </label>
      <input
        type="date"
        value={reservation.fechaSalida}
        onChange={(e) =>
          setReservation({ ...reservation, fechaSalida: e.target.value })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
      />

      {/* Cantidad de Personas */}
      <label className="block text-sm font-medium text-gray-700">
        Number of People
      </label>
      <input
        type="number"
        placeholder="People count"
        value={reservation.cantPersonas}
        onChange={(e) =>
          setReservation({ ...reservation, cantPersonas: e.target.value })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
      />

      {/* Select Ciudad */}
      <label className="block text-sm font-medium text-gray-700">City</label>
      <select
        value={reservation.ciudad.idCiudad}
        onChange={(e) =>
          setReservation({
            ...reservation,
            ciudad: { idCiudad: e.target.value },
          })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
      >
        <option value="">Select City</option>
        {cities.map((city:any) => (
          <option key={city.idCiudad} value={city.idCiudad}>
            {city.ciudad}
          </option>
        ))}
      </select>

      {/* Input para Persona */}
      <label className="block text-sm font-medium text-gray-700">
        User First Name
      </label>
      <input
        type="text"
        value={reservation.persona.nombres}
        onChange={(e) =>
          setReservation({
            ...reservation,
            persona: { ...reservation.persona, nombres: e.target.value },
          })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="First Name"
        required
      />

      <label className="block text-sm font-medium text-gray-700">
        User Last Name
      </label>
      <input
        type="text"
        value={reservation.persona.apellidos}
        onChange={(e) =>
          setReservation({
            ...reservation,
            persona: { ...reservation.persona, apellidos: e.target.value },
          })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Last Name"
        required
      />

      <label className="block text-sm font-medium text-gray-700">
        User Document
      </label>
      <input
        type="text"
        value={reservation.persona.documento}
        onChange={(e) =>
          setReservation({
            ...reservation,
            persona: { ...reservation.persona, documento: e.target.value },
          })
        }
        className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Document"
        required
      />

      {/* Select Servicio */}
      <label className="block text-sm font-medium text-gray-700">
        Service (Optional)
      </label>
      <select
        value={reservation.servicio?.idServicio || ""}
        onChange={(e) =>
          setReservation({
            ...reservation,
            servicio: { idServicio: e.target.value },
          })
        }
        className="mt-1 mb-6 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select Service</option>
          
        {services.map((service:any) => (
          <option key={service.idServicio} value={service.idServicio}>
            {service.tipoHabitacion} - ${service.precio}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700"
      >
        {isEdit ? "Update" : "Create"} Reservation
      </button>
    </div>
  );
}

export { ReservationForm };
