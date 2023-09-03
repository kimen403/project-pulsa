const UserLogin = require('../../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuth');

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);
    const { id, role, saldo } = await this._userRepository.getIdRoleSaldoByUsername(username);
    const saldoString = saldo.toString();
    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ username, id, role });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ username, id, role });

    // const newAuthentication2 = {
    //   accessToken, refreshToken, role, saldoString,
    // };
    const newAuthentication = new NewAuthentication({
      accessToken, refreshToken, role, saldoString,
    });
    console.log('newAuthentication');

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
