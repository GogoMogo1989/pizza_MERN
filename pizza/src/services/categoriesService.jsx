const API_BASE_URL = 'https://pizza-mern.onrender.com/api/categories';

export async function fetchCategories() {
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
