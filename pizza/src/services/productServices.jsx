const API_BASE_URL = 'http://localhost:3000/api/data';

export async function fetchData() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Hiba történt az adatok lekérdezésekor!');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Hiba az adatok lekérdezése során: ${error.message}`);
  }
}

export async function deleteData(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Hiba történt a törlés során!');
    }
    
    return { message: 'Sikeres törlés!', id };
  } catch (error) {
    throw new Error(`Hiba történt a törlés során: ${error.message}`);
  }
}

// Termék adatainak lekérdezése ID alapján
export async function fetchProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Hiba történt a termék adatainak lekérdezésekor!');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Hiba történt a termék adatainak lekérdezése során: ${error.message}`);
    }
  }

  // Adatok mentése (termék létrehozása/frissítése)
export async function saveProductData(itemId, data) {
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId ? `${API_BASE_URL}/${itemId}` : `${API_BASE_URL}`;
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Hiba történt az adat mentése során!');
      }
      return { message: 'Termék sikeresen mentve!' };
    } catch (error) {
      throw new Error(`Hiba történt az adat mentése során: ${error.message}`);
    }
  }
