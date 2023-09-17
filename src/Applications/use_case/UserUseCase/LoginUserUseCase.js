const UserLogin = require('../../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuth');
const AdminLogin = require('../../../Domains/authentications/entities/AdminLogin');

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

  async execute(useCasePayload, server = false) {
    const { username, password } = new UserLogin(useCasePayload);
    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);
    const profile = await this._userRepository.getIdRoleSaldoByUsername(username);
    const { id, role } = profile;
    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ username, id, role });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ username, id, role });

    console.log('masuk usecase login');
    // const newAuthentication2 = {
    //   accessToken, refreshToken, role, saldoString,
    // };
    console.log({ ...profile });
    const newAuthentication = server ? new AdminLogin(
      {
        accessToken, refreshToken, ...profile,
      },
    ) : new NewAuthentication({
      accessToken, refreshToken, ...profile,
    });
    // console.log('newAuthentication');

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
