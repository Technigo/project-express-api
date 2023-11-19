// Fetches API using different endpoints

const BASE_URL = "https://nobel-prize-data.onrender.com/"

export async function getPrizeList () {
    const response = await fetch (
        BASE_URL
    );

    if (!response.ok) {
        throw new Error("Ooops, something went wrong.")
    }

    const data =await response.json();
    return data.results;
}

export async function getPrizeList () {
    const response = await fetch (
        BASE_URL
    );

    if (!response.ok) {
        throw new Error("Couldn't fetch data")
    }

    const data =await response.json();
    return data.results;
}