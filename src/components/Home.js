import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

import Category from './Category';

class Home extends React.Component {
  state = {
    search: '',

  };

  HandleClick = async () => {
    const { search } = this.state;
    const pes = await getProductsFromCategoryAndQuery('informatica', search);
    console.log(pes);
  };

  HandleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    return (
      <>
        <div id="categorias">
          <Category />
        </div>

        <div id="barraDePesquisa">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>

          <label htmlFor="search">
            Busca:
            <input
              type="text"
              data-testid="query-input"
              id="search"
              name="search"
              onChange={ this.HandleChange }
            />
          </label>

          <button
            data-testid="query-button"
            type="button"
            onClick={ this.HandleClick }
          >
            Pesquisar
          </button>

          <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>

        </div>
      </>
    );
  }
}

export default Home;
