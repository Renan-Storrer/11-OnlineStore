import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>

      </>
    );
  }
}

export default Home;
