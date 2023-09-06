// const AddCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/AddCommentUseCase");
// const DeleteCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/DeleteCommentUseCase");

const PostNewTransaksiUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/PostNewTransaksiUseCase');
const NewTransaksi = require('../../../../Domains/transaksi/entities/NewTransaksi');

class TransaksiHandler {
  constructor(container) {
    this._container = container;

    this.postTransaksiHandler = this.postTransaksiHandler.bind(this);
    // this.postCommentHandler = this.postCommentHandler.bind(this);
    // this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postTransaksiHandler(request, h) {
    const usecasePayload = new NewTransaksi(request.payload);

    console.log('usecasePayload', usecasePayload);
    const addTransaksiUseCase = this._container.getInstance(PostNewTransaksiUseCase.name);
    // console.log(addTransaksiUseCase);
    const addedTransaksi = await addTransaksiUseCase.execute(usecasePayload, request.auth.credentials.id);

    const response = h.response({
      status: 'success',
      data: {
        addedTransaksi,
      },
    });

    response.code(201);
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
