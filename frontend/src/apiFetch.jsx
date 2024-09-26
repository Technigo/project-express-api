// Fetches API using different endpoints

const BASE_URL = "https://nobel-prize-data.onrender.com/"

export async function getPrizeList() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("Oops, something went wrong.");
        }
        const data = await response.json();
        return data; // Assuming the data structure matches the laureates' information directly
    } catch (error) {
        throw new Error("Error fetching data: " + error.message);
    }
}

export async function getLaureates(category) {
    try {
      const response = await fetch(`${BASE_URL}category/${category}`);
      if (!response.ok) {
        throw new Error("Oops, something went wrong.");
      }
      const data = await response.json();
      return data; // Assuming the data structure matches the laureates' information directly
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  }