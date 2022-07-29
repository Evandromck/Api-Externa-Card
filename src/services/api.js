import axios from "axios";

const BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export async function getCards() {
  const response = await axios.get(BASE_URL);
  return response.data;
}
