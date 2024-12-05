export async function getPeticio() {
    const response = await fetch('${import.meta.env.VITE_URL_BACK}/getPeticio')
    if(!response.ok){
        throw new Error('Error al obtenir dades')
    }

    const data = await response.json()
    return data;
}
