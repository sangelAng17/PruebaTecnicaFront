import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Reservation } from '../util/interface/reservation';
import { getAllReservations,deleteReservation } from '../services/globalApi.services'; 

function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [activeReservationId, setActiveReservationId] = useState<number | null>(null);
  const navetate = useNavigate();
  const [filters, setFilters] = useState({
    fechaIngreso: '',
    fechaSalida: '',
    cliente: '',
    servicio: ''
  });

  // obtener datos de reservas
  useEffect(() => {
    console.log('Obteniendo reservas...');
    reservationsList();
    console.log('Reservas obtenidas', reservations);
  }, [reservations]);

  
  const reservationsList = async () => {
    const response = await getAllReservations();
    setReservations(response.data);
  }

  // Maneja el clic para mostrar/ocultar los detalles de la reserva
  const toggleReservationDetails = (id: number) => {
    setActiveReservationId((prevId) => (prevId === id ? null : id));
  };

  // Maneja cambios en los filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Aplica los filtros sobre las reservas
  useEffect(() => {
    const filtered = reservations.filter((reserva) => {
      const matchesFechaIngreso =
        filters.fechaIngreso === '' || reserva.fechaIngreso >= filters.fechaIngreso;
      const matchesFechaSalida =
        filters.fechaSalida === '' || reserva.fechaSalida <= filters.fechaSalida;
      const matchesCliente =
        filters.cliente === '' ||
        `${reserva.persona.nombres} ${reserva.persona.apellidos}`
          .toLowerCase()
          .includes(filters.cliente.toLowerCase());
      const matchesServicio =
        filters.servicio === '' ||
        (reserva.servicio && reserva.servicio.tipoHabitacion.toLowerCase().includes(filters.servicio.toLowerCase()));

      return matchesFechaIngreso && matchesFechaSalida && matchesCliente && matchesServicio;
    });

    setFilteredReservations(filtered);
  }, [filters, reservations]);



  // Funciones para manejar acciones de los botones
  const handleEdit = (id: number) => {
    navetate(`/${id}`);
  };

  const handleCancel = async (id: number) => {
    const response =  await deleteReservation(id);
    alert(`Cancelando reserva con ID: ${id}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-96 p-6 bg-white shadow-md rounded-lg">
       {/* Filtros */}
       <h2 className="text-2xl font-bold mb-4">RESERVAS ACTIVAS</h2>
       <hr className='my-4'/>
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
            <input
              type="date"
              name="fechaIngreso"
              value={filters.fechaIngreso}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Salida</label>
            <input
              type="date"
              name="fechaSalida"
              value={filters.fechaSalida}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cliente</label>
            <input
              type="text"
              name="cliente"
              placeholder="Nombre del cliente"
              value={filters.cliente}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Servicio</label>
            <input
              type="text"
              name="servicio"
              placeholder="Tipo de servicio"
              value={filters.servicio}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <hr className='my-4'/>
        <h2 className="text-2xl font-bold mb-4">LISTA DE RESERVAS</h2>
        <hr className='my-4'/>
        <div className='p-4 bg-gray-500 rounded-md shadow-sm'>
        <ul className="space-y-2">
          {filteredReservations.map((reserva) => (
            <li
              key={reserva.id}
              className="p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer"
              onClick={() => toggleReservationDetails(reserva.id)}
            >
              <span className="font-semibold">
                Numero de Reserva:
              </span>
              <span className="text-gray-500"> {reserva.id} </span>
              <br/>
              <span className="font-semibold">Nombre de Cliente:</span>
              <span className="text-gray-500">  {reserva.persona.nombres} {reserva.persona.apellidos}</span>

              {/* Acordeón para mostrar detalles */}
              {activeReservationId === reserva.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p><strong>Fecha de Ingreso:</strong> {reserva.fechaIngreso}</p>
                  <p><strong>Fecha de Salida:</strong> {reserva.fechaSalida}</p>
                  <p><strong>Cantidad de Personas:</strong> {reserva.cantPersonas}</p>
                  <p><strong>Documento del Usuario:</strong> {reserva.persona.documento}</p>
                  {reserva.servicio ? (
                    <div>
                      <p><strong>Tipo de Habitación:</strong> {reserva.servicio.tipoHabitacion}</p>
                      <p><strong>Precio:</strong> ${reserva.servicio.precio}</p>
                      <p><strong>Opciones:</strong> {reserva.servicio.opciones}</p>
                      <p><strong>Descripción:</strong> {reserva.servicio.contenido}</p>
                      <p><strong>Camas:</strong> {reserva.servicio.camas}</p>
                    </div>
                  ) : (
                    <p><strong>Servicio:</strong> Sin servicio asignado</p>
                  )}
                  {/* Botones para editar y cancelar */}
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() => handleEdit(reserva.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleCancel(reserva.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </Layout>
  );
}

export { ReservationList };
