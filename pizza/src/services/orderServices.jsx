const API_BASE_URL = 'http://localhost:3000/api/userorder';

// Rendelés lekérdezése ID alapján
export async function fetchOrderById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Hiba történt a termék adatainak lekérdezésekor!');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Hiba a termék adatainak lekérdezése során: ${error.message}`);
  }
}

// Rendelés frissítése ID alapján
export async function updateOrderById(id, orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Hiba történt a rendelés frissítése során!');
    }

    return { message: 'A rendelés sikeresen frissítve!' };
  } catch (error) {
    throw new Error(`Hiba történt a rendelés frissítése során: ${error.message}`);
  }
}

// Rendelések összes adatának lekérdezése
export async function fetchOrders() {
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

// Rendelés státuszának frissítése (aktív/inaktív)
export async function updateOrderStatus(id, isActive) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_active: isActive }),
    });

    if (!response.ok) {
      throw new Error('Hiba történt az adat mentése során!');
    }
    return { message: 'Státusz frissítése sikeres!', isActive };
  } catch (error) {
    throw new Error(`Hiba az adat mentése során: ${error.message}`);
  }
}

// Rendelés lezárása
export async function markOrderDone(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/done/${id}`);
    if (!response.ok) {
      throw new Error('Hiba történt a rendelés lezárása során!');
    }
    return { message: 'Rendelés sikeresen lezárva!' };
  } catch (error) {
    throw new Error(`Hiba történt a rendelés lezárása során: ${error.message}`);
  }
}

// Rendelés törlése ID alapján
export async function deleteOrder(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Hiba történt a törlés során!');
    }
    return { message: 'Rendelés sikeresen törölve!' };
  } catch (error) {
    throw new Error(`Hiba történt a törlés során: ${error.message}`);
  }
}
