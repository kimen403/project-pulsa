// const AddCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/AddCommentUseCase");
// const DeleteCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/DeleteCommentUseCase");

const HistoryTopUpUseCase = require('../../../../Applications/use_case/TopUpUseCase/HistoryTopUpUseCase');
const GetHistoryTransaksiByUserIdUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/GetHistoryTransaksiByUserIdUseCase');
const GetOneTransaksiHistoryUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/GetOneTransaksiHistoryUseCase');
const PostNewTransaksiUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/PostNewTransaksiUseCase');
const NewTransaksi = require('../../../../Domains/transaksi/entities/NewTransaksi');

class TransaksiHandler {
  constructor(container) {
    this._container = container;

    this.postTransaksiHandler = this.postTransaksiHandler.bind(this);
    this.getHistoryTopupHandler = this.getHistoryTopupHandler.bind(this);
    this.getTransaksiHistoryUserHandler = this.getTransaksiHistoryUserHandler.bind(this);
    this.getTransaksiHistoryUserByIdHandler = this.getTransaksiHistoryUserByIdHandler.bind(this);
  }

  async postTransaksiHandler(request, h) {
    const usecasePayload = new NewTransaksi(request.payload);

    const createTransaksiUseCase = this._container.getInstance(PostNewTransaksiUseCase.name);

    const data = await createTransaksiUseCase.execute(usecasePayload, request.auth.credentials.id, request.auth.credentials.role);

    const response = h.response({
      data,
    });

    response.code(201);
    return response;
  }

  async getHistoryTopupHandler(request, h) {
    const userId = request.auth.credentials.id;
    const getHistoryTopUpUseCase = this._container.getInstance(HistoryTopUpUseCase.name);
    const historyTopUp = await getHistoryTopUpUseCase.execute(userId);

    const response = h.response({
      status: 'success',
      historyTopUp,
    });
    response.code(200);
    return response;
  }

  async getTransaksiHistoryUserHandler(request, h) {
    const userId = request.auth.credentials.id;
    console.log('masuk get transaksi history user handler');
    const getHistoryTransaksiUser = this._container.getInstance(GetHistoryTransaksiByUserIdUseCase.name);
    const historyTransaksi = await getHistoryTransaksiUser.execute(userId);

    const response = h.response({
      status: 'success',
      historyTransaksi,
    });
    response.code(200);
    return response;
  }

  async getTransaksiHistoryUserByIdHandler(request, h) {
    const userId = request.auth.credentials.id;
    const idTransaksi = request.params.id;
    console.log('masuk get transaksi history user handler');
    const getOneTransaksiHistory = this._container.getInstance(GetOneTransaksiHistoryUseCase.name);
    const historyTransaksi = await getOneTransaksiHistory.execute(userId, idTransaksi);

    const response = h.response({
      status: 'success',
      historyTransaksi,
    });
    response.code(200);
    return response;
  }
  // async postCommentHandler(request, h) {
  //     const usecasePayload = {
  //         content: request.payload.content,
  //         threadId: request.params.threadId,
  //         owner: request.auth.credentials.id,
  //     };

  //     const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
  //     const addedComment = await addCommentUseCase.execute(usecasePayload);

  //     const response = h.response({
  //         status: "success",
  //         data: {
  //             addedComment,
  //         },
  //     });
  //     response.code(201);
  //     return response;
  // }
  // async deleteCommentHandler(request, h) {
  //     const usecasePayload = {
  //         commentId: request.params.commentId,
  //         threadId: request.params.threadId,
  //     };
  //     const owner = request.auth.credentials.id;
  //     const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
  //     const deleteComment = await deleteCommentUseCase.execute(owner, usecasePayload);

  //     const response = h.response(
  //         deleteComment
  //     );
  //     response.code(200);
  //     return response;
  // }
}
module.exports = TransaksiHandler;
