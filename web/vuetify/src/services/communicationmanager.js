const API_URL = import.meta.env.VITE_URL_BACK;
import socket from '@/services/socket';


//------------------- PETICIO ------------------
export async function getPeticio() {
    console.log('Fetching data from:', `${API_URL}peticion`);
    const response = await fetch(`${API_URL}peticion`);
    if (!response.ok) {
      throw new Error('Error al obtenir dades');
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  }
  
  export async function deletePeticion(id) {
    console.log("Communication deleting:", id);
    const url = `${API_URL}peticion/:${id}`;
    console.log("URL:", url);
  
    try {
      const response = await fetch(url, { method: 'DELETE' });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error(errorText || 'Error al eliminar la petición');
      }
  
      const result = await response.json();
      console.log("Eliminación exitosa:", result);
      return result;
    } catch (error) {
      console.error("Error en deletePeticion:", error);
      throw error;
    }
  }

  export async function modificarPeticio(peticio) {
    try {
        const response = await fetch(`${API_URL}peticion${peticio.id_peticio}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(peticio),
        });

        if (!response.ok) {
            throw new Error('Error al modificar la petició');
        }

        const updatedPeticio = await response.json();
        return updatedPeticio;
    } catch (error) {
        console.error("Error en modificarPeticio: ", error);
    }
}

//------------------------ USUARIS ----------------------------------------------------------------

export async function getUsuaris() {
  console.log('Fetching data from:', `${API_URL}usuaris`);
    const response = await fetch(`${API_URL}usuaris`);
    if (!response.ok) {
      throw new Error('Error al obtenir dades');
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
}


export async function deleteUsuaris(id) {
  console.log("Communication deleting:", id);
  const url = `${API_URL}usuaris/:${id}`;
  console.log("URL:", url);

  try {
    const response = await fetch(url, { method: 'DELETE' });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(errorText || 'Error al eliminar usuaris');
    }

    const result = await response.json();
    console.log("Eliminación exitosa:", result);
    return result;
  } catch (error) {
    console.error("Error en deletePeticion:", error);
    throw error;
  }
}

export async function registerProfessor(payload) {
  const url = `${API_URL}profes`;
  console.log('Sending registration payload to:', url);

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en el backend:', errorText);
          throw new Error(errorText || 'Error al registrar el profesor');
      }

      const result = await response.json();
      console.log('Registro exitoso:', result);
      return result;
  } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
  }
}


//------------------------ CATEGORIA -------------------------
export async function getCategoria() {
  console.log('Fetching data from:', `${API_URL}categoria`);
  const response = await fetch(`${API_URL}categoria`);
  if (!response.ok) {
    throw new Error('Error al obtenir dades');
  }
  const data = await response.json();
  console.log('Data received:', data);
  return data;
};

//------------------------ LOGIN --------------------------------
export async function loginProfessor(correu_profe, contrasenya) {
  const url = `${API_URL}loginProf`;  // URL para el login

  console.log('Sending login request to:', url);
  
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correu_profe, contrasenya }), // Enviar las credenciales
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en el backend:', errorText);
          throw new Error(errorText || 'Error al iniciar sesión');
      }

      const result = await response.json();
      console.log('Login exitoso:', result);
      return result; // Aquí puedes retornar la respuesta del backend (por ejemplo, los datos del usuario)
  } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
  }
}

//------------------- MENTORES PENDIENTES ------------------
export async function getMentoresPendientes() {
  console.log('Fetching mentores pendientes from:', `${API_URL}mentoresPendientes`);
  const response = await fetch(`${API_URL}mentoresPendientes`);
  if (!response.ok) {
      throw new Error('Error al obtener mentores pendientes de validación');
  }
  const data = await response.json();
  console.log('Mentores pendientes:', data);
  return data;
}

//------------------- VALIDAR MENTOR ------------------

export async function validarMentor(mentorId, validado) {
  const url = `${API_URL}validarMentor/${mentorId}`;
  console.log('Sending request to validate mentor:', url);

  try {
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ validado }),  // true (1) para aprobar, false (0) para rechazar
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en el backend:', errorText);
          throw new Error(errorText || 'Error al modificar la validación del mentor');
      }

      const result = await response.json();
      console.log('Resultado de la validación:', result);
      return result;
  } catch (error) {
      console.error('Error al validar mentor:', error);
      throw error;
  }
}


//-----------------REESTABLECER CONTRASEÑA ADMINISTRACION VUE-----------------

export async function restablecerCOntrProf(correu_profe) {
  const url = `${API_URL}peticioRestaurarContraProfes`;
  console.log('Sending request to restablish your password:', url);

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ validado }),  // true (1) para aprobar, false (0) para rechazar
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en el backend:', errorText);
          throw new Error(errorText || 'Error al modificar la validación del mentor');
      }

      const result = await response.json();
      console.log('Resultado de la validación:', result);
      return result;
  } catch (error) {
      console.error('Error al Gestionar la peticion de restablecer la contraseña:', error);
      throw error;
  }
}
