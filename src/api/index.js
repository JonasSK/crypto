import axios from "axios";

const client = axios.create({
  baseURL: "https://coincap.io/",
});

export default {
  async getCoin(id) {
    if (!id) {
      throw new Error("Id missing");
    }

    try {
      const res = await client.get(`page/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async getAllCoins() {
    try {
      const res = await client.get("front");
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
