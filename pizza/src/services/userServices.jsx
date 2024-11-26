const API_BASE_URL = 'https://pizza-mern.onrender.com/api/user';

export async function deleteUser(id) {
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

export async function loginUser(username, password) {
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

  export async function fetchAllUsers() {
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
  
  export async function fetchUserById(id) {
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
  
  export async function registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Hiba történt az adat mentése során!');
      }
      return { message: 'Sikeres regisztráció!' };
    } catch (error) {
      throw new Error(`Hiba történt az adat mentése során: ${error.message}`);
    }
  }

  export async function updateUser(id, userData) {
      try {
          const response = await fetch(`${API_BASE_URL}/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
          });
  
          if (!response.ok) {
              const message = await response.text();
              throw new Error(message);
          }
  
          return await response.json();  
      } catch (error) {
          throw new Error(`Hiba a felhasználó frissítésekor: ${error.message}`);
      }
  }
  