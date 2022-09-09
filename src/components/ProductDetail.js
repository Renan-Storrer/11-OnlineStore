import React from 'react';
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {
  handleClick() {
    <Link to="/shoppingcart" />;
  }

  render() {
    return (
      <section className="productDetail">
        <img src="" alt="" />
        <p>Nome:</p>
        <p>Especificação Técnica:</p>
        <p>Preço:</p>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Ir para o Carrinho
        </button>
      </section>
    );
  }
}
export default ProductDetail;
