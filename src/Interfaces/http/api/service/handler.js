const crypto = require('crypto');
const UploadUseCase = require('../../../../Applications/services/UploadUseCase');
const GetProductsUseCase = require('../../../../Applications/use_case/ServerAdminUseCase/GetProductsUseCase');
const UpdateProductsServerUseCase = require('../../../../Applications/use_case/ServerAdminUseCase/UpdateProductsServerUseCase');
const CallBackUseCase = require('../../../../Applications/use_case/TopUpUseCase/CallBackUseCase');
const TopUpUseCase = require('../../../../Applications/use_case/TopUpUseCase/TopUpUseCase');

class ServicesHandler {
  constructor(container) {
    this._container = container;
    this.postPriceListHandler = this.postPriceListHandler.bind(this);
    this.postTopupHandler = this.postTopupHandler.bind(this);
    this.postConfirmHandler = this.postConfirmHandler.bind(this);
    this.postUploadHandler = this.postUploadHandler.bind(this);
    this.getUpdateProductsHandler = this.getUpdateProductsHandler.bind(this);
    this.postCallbackDigiflazzHandler = this.postCallbackDigiflazzHandler.bind(this);

    // this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async getUpdateProductsHandler(request, h) {
    const getProducts = this._container.getInstance(GetProductsUseCase.name);
    const updateProductsServer = this._container.getInstance(UpdateProductsServerUseCase.name);
    const productsServer = await getProducts.execute();
    // console.log('masuk', updateProductsServer);
    const res = await updateProductsServer.execute(productsServer);
    const response = h.response({
      status: 'success',
      res,
    });
    response.code(200);
    return response;
  }

  async postUploadHandler(request, h) {
    const usecasePayload = request.payload.data;
    // console.log(usecasePayload);
    const uploadUseCase = this._container.getInstance(UploadUseCase.name);
    // console.log('masuk');

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

  async postConfirmHandler(request, h) {
    const usecasePayload = request.payload;
    console.log('payload dari callback:', usecasePayload);
    const callBackUseCase = this._container.getInstance(CallBackUseCase.name);
    const res = await callBackUseCase.execute(usecasePayload);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async postTopupHandler(request, h) {
    const { id } = request.auth.credentials;
    const { nominal } = request.payload;
    // console.log(id);
    const addTopupUseCase = this._container.getInstance(TopUpUseCase.name);

    const topup = await addTopupUseCase.execute(id, nominal);

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

  async postCallbackDigiflazzHandler(request, h) {
    const secret = 'test';

    const post_data = request.payload;
    console.log(post_data);
    const post_data2 = JSON.stringify(post_data);
    console.log(post_data2);
    try {
      // JSON.parse(post_data);
      const signature = crypto.createHmac('sha1', secret).update(post_data2).digest('hex');
      console.log(request.headers['x-hub-signature']);
      console.log(signature);
      if (request.headers['x-hub-signature'] === `sha1=${signature}`) {
        console.log(JSON.parse(post_data));
        console.log('signature valid');
      }
    } catch (e) {
      console.log('Error signature', e);
    }

    // console.log(signature);

    return h.response().code(200);
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
