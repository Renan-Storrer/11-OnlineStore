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
      <div>
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
        <form>
          <h1>Avaliação</h1>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
          <div>
            <input
              type="radio"
              id="rate1"
              name="rate"
              value="1"
            />
            <label htmlFor="rate1">1</label>

            <input
              type="radio"
              id="rate2"
              name="rate"
              value="2"
            />
            <label htmlFor="rate2">2</label>

            <input
              type="radio"
              id="rate3"
              name="rate"
              value="3"
            />
            <label htmlFor="rate3">3</label>

            <input
              type="radio"
              id="rate4"
              name="rate"
              value="4"
            />
            <label htmlFor="rate4">4</label>

            <input
              type="radio"
              id="rate5"
              name="rate"
              value="5"
            />
            <label htmlFor="rate5">5</label>

          </div>
          <button type="submit">ENVIAR</button>
        </form>
      </div>
    );
  }
}
export default ProductDetail;

ProductDetail.propTypes = {
  id: propTypes.string,
}.isRequired;
