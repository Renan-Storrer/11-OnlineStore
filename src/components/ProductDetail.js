import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    product: [],
    productsOnlocalStorage: [],
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    email: '',
    comment: '',
    validatingEntries: true,
    commentsArray: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.callGetProductById(id);
    this.getFromLocalStorage();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  getFromLocalStorage() {
    const { match: { params: { id } } } = this.props;
    const response1 = JSON.parse(localStorage.getItem(id)) || [];
    const response2 = JSON.parse(localStorage.getItem('product')) || [];
    this.setState({
      commentsArray: response1,
      productsOnlocalStorage: response2,
    });
  }

  async callGetProductById(id) {
    const product = await getProductById(id);
    this.setState({ product });
  }

  async btnEnviar(event) {
    event.preventDefault();
    const { checked1, checked2, checked3, checked4, checked5, email } = this.state;
    const { match: { params: { id } } } = this.props;
    let checkEmail = false;
    let checkRate = false;
    let validatingEntries = false;
    if (email.includes('@') && email.includes('.com')) {
      checkEmail = true;
    }
    if (checked1 === true || checked2 === true || checked3 === true
       || checked4 === true || checked5 === true) {
      checkRate = true;
    }
    validatingEntries = checkEmail && checkRate;
    if (validatingEntries) {
      this.setState({
        validatingEntries,
      }, () => this.addComment(id));
    }
    this.setState({ validatingEntries });
  }

  radioChecked({ target }) {
    this.setState({
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      [target.id]: true,
    });
  }

  addComment() {
    const { comment, email } = this.state;
    let rate = 0;
    const rate1 = 1;
    const rate2 = 2;
    const rate3 = 3;
    const rate4 = 4;
    const rate5 = 5;
    const { checked1, checked2, checked3, checked4, checked5,
      commentsArray } = this.state;
    if (checked1) {
      rate = rate1;
    } else if (checked2) {
      rate = rate2;
    } else if (checked3) {
      rate = rate3;
    } else if (checked4) {
      rate = rate4;
    } else if (checked5) {
      rate = rate5;
    }
    const obj = {
      email,
      text: comment,
      rating: rate,
    };
    this.setState({ commentsArray: [...commentsArray, obj] }, this.addtoLocalStorage);
  }

  resetForm() {
    this.setState({
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      email: '',
      comment: '',
    });
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
    const { match: { params: { id } } } = this.props;
    const { commentsArray, productsOnlocalStorage, validatingEntries } = this.state;
    if (validatingEntries) {
      localStorage.setItem(id, JSON.stringify(commentsArray));
    } else {
      localStorage.setItem('product', JSON.stringify(productsOnlocalStorage));
    }
    this.resetForm();
  }

  render() {
    const { product, checked1, checked2, checked3, checked4, checked5, validatingEntries,
    } = this.state;
    const { commentsArray, email, comment } = this.state;
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
          <Link to="/shoppingCart">
            <button
              data-testid="shopping-cart-button"
              type="button"
            >
              Ir para o carrinho
            </button>
          </Link>
        </section>
        <form>
          <p>Avaliação</p>
          <label htmlFor="email">
            <input
              name="email"
              type="email"
              id="email"
              value={ email }
              placeholder="Email"
              data-testid="product-detail-email"
              required
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <div>
            <label htmlFor="rate1">
              <input
                type="radio"
                id="checked1"
                name="rate"
                value="1"
                onChange={ (event) => this.radioChecked(event) }
                checked={ checked1 }
                data-testid="1-rating"
              />
              1
            </label>
            <label htmlFor="rate2">
              <input
                type="radio"
                id="checked2"
                name="rate"
                value="2"
                onChange={ (event) => this.radioChecked(event) }
                checked={ checked2 }
                data-testid="2-rating"
              />
              2
            </label>
            <label htmlFor="rate3">
              <input
                type="radio"
                id="checked3"
                name="rate"
                value="3"
                onChange={ (event) => this.radioChecked(event) }
                checked={ checked3 }
                data-testid="3-rating"
              />
              3
            </label>
            <label htmlFor="rate4">
              <input
                type="radio"
                id="checked4"
                name="rate"
                value="4"
                onChange={ (event) => this.radioChecked(event) }
                checked={ checked4 }
                data-testid="4-rating"
              />
              4
            </label>
            <label htmlFor="rate5">
              <input
                type="radio"
                id="checked5"
                name="rate"
                value="5"
                onChange={ (event) => this.radioChecked(event) }
                checked={ checked5 }
                data-testid="5-rating"
              />
              5
            </label>
          </div>
          <textarea
            name="comment"
            value={ comment }
            placeholder="Mensagem(opcional)"
            rows="7"
            cols="35"
            data-testid="product-detail-evaluation"
            onChange={ (event) => this.handleChange(event) }
          />
          <button type="submit" data-testid="submit-review-btn">
            onClick=
            { (event) => this.btnEnviar(event) }
            ENVIAR
          </button>
        </form>
        {
          !validatingEntries
          && <p data-testid="error-msg">Campos inválidos</p>
        }
        <section className="comments">
          { commentsArray.map((coment) => (
            <div key={ coment.email }>
              <p data-testid="review-card-email">{coment.email}</p>
              <p data-testid="review-card-evaluation">{coment.text}</p>
              <p data-testid="review-card-rating">{coment.rating}</p>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
export default ProductDetail;

ProductDetail.propTypes = {
  id: propTypes.string,
}.isRequired;
