class ProductsRepository {
  async getAllProducts() {
    throw new Error('PRODUCTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllCategories() {
    throw new Error('PRODUCTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllProvidersByCategory() {
    throw new Error('PRODUCTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getProductByProvider() {
    throw new Error('PRODUCTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ProductsRepository;
