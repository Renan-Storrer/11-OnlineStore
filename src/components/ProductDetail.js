import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    product: [],
    productsOnlocalStorage: [],

  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.callGetProductById(id);
  }

  async callGetProductById(id) {
    const product = await getProductById(id);
    this.setState({ product });
  }

  addToCart(product) {
    const { productsOnlocalStorage } = this.state;
    const newProduct = product;
    newProduct.qty = 1;
    this.setState({
      productsOnlocalStorage: [...productsOnlocalStorage, newProduct],
    }, this.addtoLocalStorage);
  }

  addtoLocalStorage() {
    const { productsOnlocalStorage } = this.state;
    localStorage.setItem('product', JSON.stringify(productsOnlocalStorage));
  }

  render() {
    const { product } = this.state;
    return (
      <section className="productDetail">
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">
          Nome:
          {product.title}
        </p>
        <p>{product.warranty}</p>
        <p data-testid="product-detail-price">
          Preço:
          {product.price}
        </p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(product) }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to="/shoppingCart"
        >

          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Ir para o carrinho
          </button>
        </Link>
      </section>
    );
  }
}
export default ProductDetail;

ProductDetail.propTypes = {
  id: propTypes.string,
}.isRequired;
