/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const { S3Client } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

const pool = require('./database/postgres/pool');
const midtransCli = require('./midtrans/client');
// service (repository, helper, manager, etc)
const PasswordHash = require('../Applications/security/PasswordHash');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
// authenticationRepository
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
// userRepository
const UserRepository = require('../Domains/users/UserRepository');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
// commentRepository
const CommentRepository = require('./repository/CommentRepositoryPostgres');
const CommentRepositoryPostgres = require('./repository/CommentRepositoryPostgres');
// threadRepository
const ThreadRepository = require('./repository/ThreadRespositoryPostgres');
const ThreadRepositoryPostgres = require('./repository/ThreadRespositoryPostgres');

// midtransRepository
const MidtransRepository = require('../Domains/midtrans/MidtransRepository');
const MidtransRepositoryServer = require('./repository/MidtransRepositoryServer');

// productRepository
const ProductsRepository = require('../Domains/products/ProductsRepository');
const ProductsRepositoryPostgres = require('./repository/ProductsRepositoryPostgres');

const DigiRepositoryServer = require('./services/ServerDigiRepository');
const Digirepository = require('../Applications/services/DigiRepository');

// topUpRepository
const TopUpRepository = require('../Domains/topup/TopUpRepository');
const TopUpRepositoryPostgres = require('./repository/TopUpRepositoryPostgres');

// use case

// CallbackUseCase
const CallBackUseCase = require('../Applications/use_case/TopUpUseCase/CallBackUseCase');

const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const JwtTokenManager = require('./security/JwtTokenManager');
const RefreshAuthenticationUseCase = require('../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase');
// userUseCase
const AddUserUseCase = require('../Applications/use_case/UserUseCase/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/UserUseCase/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/UserUseCase/LogoutUserUseCase');
// threadUseCase
const AddThreadUseCase = require('../Applications/use_case/ThreadUseCase/AddThreadUseCase');
const GetDetailThreadByIdUseCase = require('../Applications/use_case/ThreadUseCase/GetDetailThreadByIdUseCase');

// commentUseCase
const AddCommentUseCase = require('../Applications/use_case/CommentUseCase/AddCommentUseCase');
const DeleteCommentUseCase = require('../Applications/use_case/CommentUseCase/DeleteCommentUseCase');

// Services Digi
const GetProductsServer = require('./services/ServerDigiRepository');

const TopUpUseCase = require('../Applications/use_case/TopUpUseCase/TopUpUseCase');

// GetProductsServer
const GetProductsUseCase = require('../Applications/use_case/ServerAdminUseCase/GetProductsUseCase');
const GetBannerUseCase = require('../Applications/use_case/ProductsUseCase/GetBannerUseCase');
const UpdateProductsServerUseCase = require('../Applications/use_case/ServerAdminUseCase/UpdateProductsServerUseCase');
// Upload
const UploadUseCase = require('../Applications/services/UploadUseCase');

const StorageServiceAWS = require('./storage/StorageServiceAWS');
const StorageService = require('../Domains/storage/StorageService');

// ProductsUseCase
const GetProductsByProviderUseCase = require('../Applications/use_case/ProductsUseCase/GetProductsByProvider');
const GetAllProvidersByCategoryUseCase = require('../Applications/use_case/ProductsUseCase/GetAllProvidersByCategory');
const GetAllCategoriesUseCase = require('../Applications/use_case/ProductsUseCase/GetAllCategories');
const GetAllProductsUseCase = require('../Applications/use_case/ProductsUseCase/GetAllProducts');

// ServerAdminUseCase
const UploadBannerUseCase = require('../Applications/use_case/ServerAdminUseCase/UploadBannerUseCase');

// TransaksiUseCase
const PostNewTransaksiUseCase = require('../Applications/use_case/Transaksi_UseCase/PostNewTransaksiUseCase');
// creating container
// TransaksiRepository
const TransaksiRepository = require('../Domains/transaksi/TransaksiRepository');
const TransaksiRepositoryPostgres = require('./repository/TransaksiRepositoryPostgres');
const HashMd5 = require('../Applications/security/Md5PasswordHash');
const CryptoHashMd5 = require('./security/CryptoHashMd5');

const container = createContainer();

// registering services and repository
container.register([
  // storageService
  {
    key: TopUpRepository.name,
    Class: TopUpRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: 'idGenerator',
    Class: nanoid,
  },
  {
    key: StorageService.name,
    Class: StorageServiceAWS,
    parameter: {
      dependencies: [
        {
          concrete: S3Client,
        },
      ],
    },
  },
  // productsRepository
  {
    key: ProductsRepository.name,
    Class: ProductsRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {

    key: TransaksiRepository.name,
    Class: TransaksiRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: MidtransRepository.name,
    Class: MidtransRepositoryServer,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
        {
          concrete: midtransCli,
        },
      ],
    },
  },
  // userRepository
  {
    key: Digirepository.name,
    Class: DigiRepositoryServer,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  // authenticationRepository
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  // passwordHash
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: HashMd5.name,
    Class: CryptoHashMd5,
    parameter: {
      dependencies: [
        {
          concrete: crypto,
        },
      ],
    },
  },
  // authenticationTokenManager
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
  // threadRepository
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  // commentRepository
  {
    key: CommentRepository.name,
    Class: CommentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  // CallbackUseCase
  {
    key: CallBackUseCase.name,
    Class: CallBackUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'topUpRepository',
          internal: TopUpRepository.name,
        },
        {
          name: 'hashGenerator',
          internal: HashMd5.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },

      ],
    },
  },
  {
    key: GetProductsUseCase.name,
    Class: GetProductsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'digiRepository',
          internal: Digirepository.name,
        },
      ],
    },
  },
  // ServerAdminUseCase
  {
    key: UploadBannerUseCase.name,
    Class: UploadBannerUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },
  },
  {
    key: GetBannerUseCase.name,
    Class: GetBannerUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },

  },
  // productsUseCase
  {
    key: GetAllProductsUseCase.name,
    Class: GetAllProductsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },
  },
  {
    key: GetAllCategoriesUseCase.name,
    Class: GetAllCategoriesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },
  },
  {
    key: GetAllProvidersByCategoryUseCase.name,
    Class: GetAllProvidersByCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },
  },
  {
    key: GetProductsByProviderUseCase.name,
    Class: GetProductsByProviderUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },
  },
  // uploadUseCase
  {
    key: UploadUseCase.name,
    Class: UploadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'storageService',
          internal: StorageService.name,
        },
      ],
    },
  },
  // topupUseCase
  {
    key: TopUpUseCase.name,
    Class: TopUpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'midtransRepository',
          internal: MidtransRepository.name,
        },
        {
          name: 'topUpRepository',
          internal: TopUpRepository.name,
        },
      ],
    },
  },

  // addUserUseCase

  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  // loginUserUseCase
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  // logoutUserUseCase
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  // refreshAuthenticationUseCase
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  // addThreadUseCase
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  // getThreadUseCase
  {
    key: GetDetailThreadByIdUseCase.name,
    Class: GetDetailThreadByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
  // addCommentUseCase
  {
    key: AddCommentUseCase.name,
    Class: AddCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  // deleteCommentUseCase
  {
    key: DeleteCommentUseCase.name,
    Class: DeleteCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
  // updateProductsServerUseCase
  {
    key: UpdateProductsServerUseCase.name,
    Class: UpdateProductsServerUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productsRepository',
          internal: ProductsRepository.name,
        },
      ],
    },
  },
  // postNewTransaksiUseCase
  {
    key: PostNewTransaksiUseCase.name,
    Class: PostNewTransaksiUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'transaksiRepository',
          internal: TransaksiRepository.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },

        {
          name: 'hashGenerator',
          internal: HashMd5.name,
        },
        {
          name: 'digiRepository',
          internal: Digirepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
