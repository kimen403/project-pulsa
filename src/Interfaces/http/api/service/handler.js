const UploadUseCase = require('../../../../Applications/services/UploadUseCase');
const GetProductsUseCase = require('../../../../Applications/use_case/Get_ProductsUseCase/GetProductsUseCase');
const TopUpUseCase = require('../../../../Applications/use_case/TopUpUseCase/TopUpUseCase');

class ServicesHandler {
  constructor(container) {
    this._container = container;
    this.postPriceListHandler = this.postPriceListHandler.bind(this);
    this.postTopupHandler = this.postTopupHandler.bind(this);
    this.postPayHandler = this.postPayHandler.bind(this);
    this.postUploadHandler = this.postUploadHandler.bind(this);

    // this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postUploadHandler(request, h) {
    const usecasePayload = request.payload.data;
    // console.log(usecasePayload);
    const uploadUseCase = this._container.getInstance(UploadUseCase.name);
    console.log('masuk');

    const fileLocation = await uploadUseCase.execute(usecasePayload);

    const response = h.response({
      status: 'success',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  }

  async postPayHandler(request, h) {
    const usecasePayload = request.payload;
    console.log(usecasePayload);
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async postTopupHandler(request, h) {
    const usecasePayload = request.payload.data;
    console.log(usecasePayload);
    const addTopupUseCase = this._container.getInstance(TopUpUseCase.name);

    const topup = await addTopupUseCase.execute(usecasePayload);

    const response = h.response(
      topup,
    );
    response.code(201);
    return response;
  }

  async postPriceListHandler(request, h) {
    const getProducts = this._container.getInstance(GetProductsUseCase.name);
    const res = await getProducts.execute();
    const response = h.response({
      status: 'success',
      data: {
        res,
      },
    });
    response.code(200);
    return response;
  }
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
module.exports = ServicesHandler;
