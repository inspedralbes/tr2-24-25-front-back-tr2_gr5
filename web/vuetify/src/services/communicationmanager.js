const API_URL = import.meta.env.VITE_URL_BACK;


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
    const url = `${API_URL}/peticion/${id}`;
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
        const response = await fetch(`${API_URL}/peticion/${peticio.id_peticio}`, {
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