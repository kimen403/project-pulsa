const { default: axios } = require('axios');

const DigiRepository = require('../../Applications/services/DigiRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class DigiRepositoryServer
  extends DigiRepository {
  constructor(token) {
    super();
    this._token = token;
  }

  async getProducts() {
    const payload = {
      cmd: 'prepaid',
      username: 'coximuoeMN7o',
      sign: 'e07f2c89f4ba8e804f81aec68c4a15c7',
    };

    const products = await axios.post('https://api.digiflazz.com/v1/price-list', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(products);
    return products;
  }

  async createTransaksiToServer(newTransaksi) {
    // console.log({ ...newTransaksi });
    try {
      const response = await axios.post('https://api.digiflazz.com/v1/transaction', { ...newTransaksi }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw new InvariantError('Transaksi gagal ditambahkan');
    }
  }
}

module.exports = DigiRepositoryServer;
