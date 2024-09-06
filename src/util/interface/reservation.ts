export interface Ciudad {
    idCiudad: number;
    ciudad: string;
  }
  
  export interface Persona {
    idUsuario: number;
    nombres: string;
    apellidos: string;
    documento: string;
  }
  
  export interface Servicio {
    idServicio: number;
    tipoHabitacion: string;
    precio: string;
    opciones: string;
    contenido: string;
    camas: string;
  }
  
  export interface Reservation {
    id: number;
    fechaIngreso: string;
    fechaSalida: string;
    cantPersonas: string;
    ciudad: Ciudad;
    persona: Persona;
    servicio: Servicio | null;  // Servicio puede ser null
  }
  