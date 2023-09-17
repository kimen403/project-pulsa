// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const TransaksiServerResponse = require('../../../Domains/transaksi/entities/TransaksiServerResponse');

class ServerGetAllTransaksiUseCase {
  constructor({ transaksiRepository }) {
    this._transaksiRepository = transaksiRepository;
  }

  async execute() {
    const result = await this._transaksiRepository.getAllTransaksi();
    // console.log('result', result);
    const transaksi = result.map((item) => new TransaksiServerResponse(item));

    return transaksi;
  }
}

module.exports = ServerGetAllTransaksiUseCase;
