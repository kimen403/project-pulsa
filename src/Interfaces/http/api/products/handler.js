const UploadUseCase = require('../../../../Applications/services/UploadUseCase');
const GetAllCategoriesUseCase = require('../../../../Applications/use_case/ProductsUseCase/GetAllCategories');
const GetAllProductsUseCase = require('../../../../Applications/use_case/ProductsUseCase/GetAllProducts');
const GetAllProvidersByCategoryUseCase = require('../../../../Applications/use_case/ProductsUseCase/GetAllProvidersByCategory');
const GetBannerUseCase = require('../../../../Applications/use_case/ProductsUseCase/GetBannerUseCase');
const GetProductsByProviderUseCase = require('../../../../Applications/use_case/ProductsUseCase/GetProductsByProvider');
const UploadBannerUseCase = require('../../../../Applications/use_case/ServerAdminUseCase/UploadBannerUseCase');

class ProductsHandler {
  constructor(container) {
    this._container = container;
    // this.postCommentHandler = this.postCommentHandler.bind(this);
    // this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.getAllProductsHandler = this.getAllProductsHandler.bind(this);
    this.getAllCategoriesHandler = this.getAllCategoriesHandler.bind(this);
    this.getAllProvidersByCategoryHandler = this.getAllProvidersByCategoryHandler.bind(this);
    this.getAllProductsByProviderHandler = this.getAllProductsByProviderHandler.bind(this);
    this.getBannerHandler = this.getBannerHandler.bind(this);
    this.postBannerHandler = this.postBannerHandler.bind(this);
  }

  async getAllProductsHandler(request, h) {
    const getAllProductsUseCase = this._container.getInstance(
      GetAllProductsUseCase.name,
    );
    const products = await getAllProductsUseCase.execute();
    const response = h.response({
      status: 'success',
      products,
    });
    response.code(200);
    return response;
  }

  async getAllCategoriesHandler(request, h) {
    const getAllCategoriesUseCase = this._container.getInstance(
      GetAllCategoriesUseCase.name,
    );
    const categories = await getAllCategoriesUseCase.execute();
    const response = h.response({
      status: 'success',
      categories,
    });
    response.code(200);
    return response;
  }

  async getAllProvidersByCategoryHandler(request, h) {
    const getAllProvidersByCategoryUseCase = this._container.getInstance(
      GetAllProvidersByCategoryUseCase.name,
    );
    const providers = await getAllProvidersByCategoryUseCase.execute(request.params.categoryId);
    const response = h.response({
      status: 'success',
      providers,
    });
    response.code(200);
    return response;
  }

  async getAllProductsByProviderHandler(request, h) {
    const getAllProductsByProviderUseCase = this._container.getInstance(
      GetProductsByProviderUseCase.name,
    );
    const products = await getAllProductsByProviderUseCase.execute(request.params.providerId);
    const response = h.response({
      status: 'success',
      products,
    });
    response.code(200);
    return response;
  }

  async getBannerHandler(request, h) {
    const getBannerUseCase = this._container.getInstance(
      GetBannerUseCase.name,
    );
    const banner = await getBannerUseCase.execute();
    const response = h.response({
      status: 'success',
      banner,
    });
    response.code(200);
    return response;
  }

  async postBannerHandler(request, h) {
    const { desc } = request.payload;
    // console.log(desc);
    const uploadUserUseCase = this._container.getInstance(
      UploadUseCase.name,
    );
    const uploadBannerUseCase = this._container.getInstance(
      UploadBannerUseCase.name,
    );

    const { image } = request.payload;
    const url = await uploadUserUseCase.execute(image);
    // console.log(url);
    const banner = await uploadBannerUseCase.execute(url, desc);
    const response = h.response({
      status: 'success',
      banner,
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
module.exports = ProductsHandler;
