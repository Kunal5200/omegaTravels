import axios from "axios";

export default async function fetchCountry(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
