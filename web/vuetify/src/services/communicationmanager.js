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
  