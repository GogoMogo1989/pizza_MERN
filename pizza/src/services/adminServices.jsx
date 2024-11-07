const API_BASE_URL = 'http://localhost:3000/api/admin';

export async function deleteAdmin(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Hiba történt a törlés során!');
    }

    return { message: 'Sikeres törlés!' };
  } catch (error) {
    throw new Error(`Hiba történt a törlés során! ${error.message}`);
  }
}

export async function loginAdmin(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Hiba a bejelentkezés során: ${error.message}`);
    }
  }

  export async function fetchAllAdmins() {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      if (!response.ok) {
        throw new Error('Hiba történt az admin adatok lekérdezésekor!');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Hiba az admin adatok lekérdezése során: ${error.message}`);
    }
  }
  
  export async function fetchAdminById(id) {
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
  
  export async function registerAdmin(adminData) {
    try {
      const response = await fetch(`${API_BASE_URL}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
  
      if (!response.ok) {
        throw new Error('Hiba történt az adat mentése során!');
      }
      return { message: 'Sikeres regisztráció!' };
    } catch (error) {
      throw new Error(`Hiba történt az adat mentése során: ${error.message}`);
    }
  }