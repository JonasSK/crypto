import axios from "axios";

const client = axios.create({
    baseURL: "https://api.coinmarketcap.com/v1",
});

export default {
    async getCoin(id, convert) {
        const params = {}
        if(convert) {
            params.convert = convert;
        }

        if (!id) {
            throw new Error("Id missing");
        }



        try {
            const res = await client.get(`/ticker/${id}`, { params: params });
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    async getAllCoins(convert) {
        try {
            const params = {
                limit: 0
            }
            if(convert) {
                params.convert = convert;
            }

            const res = await client.get("/ticker/", { params: params });
            return res.data;
        } catch (err) {
            throw err;
        }
    },
};
