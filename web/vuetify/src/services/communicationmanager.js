export async function getPeticio() {
    console.log('Fetching data from:', `${import.meta.env.VITE_URL_BACK}/peticion`);
    const response = await fetch(`${import.meta.env.VITE_URL_BACK}/peticion`);
    if (!response.ok) {
      throw new Error('Error al obtenir dades');
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  }
  
  export async function deletePeticion(id) {
    console.log("Communication deleting:", id);
    const url = `${import.meta.env.VITE_URL_BACK}/peticion/${id}`;
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