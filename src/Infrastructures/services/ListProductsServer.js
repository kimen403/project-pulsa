const { default: axios } = require("axios");
const ListProducts = require("../../Applications/services/ListProducts");

class ListProductsServer extends ListProducts {
    constructor(token) {
        super();
        this._token = token;
    }

    async getProducts() {
        const payload = {
            "cmd": "prepaid",
            "username": "coximuoeMN7o",
            "sign":"e07f2c89f4ba8e804f81aec68c4a15c7"
        }
        const products = await axios.post(`https://api.digiflazz.com/v1/price-list`, payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return products;
    }
}

module.exports = ListProductsServer