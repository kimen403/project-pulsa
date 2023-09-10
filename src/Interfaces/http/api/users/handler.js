const AddUserUseCase = require('../../../../Applications/use_case/UserUseCase/AddUserUseCase');
const FindUserByIdUseCase = require('../../../../Applications/use_case/UserUseCase/FindUserByIdUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }

  async getUserByIdHandler(request) {
    const { id } = request.auth.credentials;
    const findUserByIdUseCase = this._container.getInstance(FindUserByIdUseCase.name);
    const user = await findUserByIdUseCase.execute(id);
    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
