import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

import Category from './Category';

class Home extends React.Component {
  state = {
    search: '',
    products: [],
  };

  HandleClick = async () => {
    const { search } = this.state;
    const pes = await getProductsFromCategoryAndQuery(null, search);
    const resultado = pes.results;
    console.log(resultado);
    this.setState({
      products: resultado,
    });
  };

  HandleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { products } = this.state;
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

        {

          (products.length > 0)
            ? (
              products.map((product) => (
                <div
                  className="poducts-card"
                  key={ product.id }
                  data-testid="product"
                >
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{ product.title }</p>
                  <p>{`R$ ${product.price}`}</p>
                  <br />
                </div>
              ))
            )
            : <p>Nenhum produto foi encontrado</p>
        }
      </>
    );
  }
}

export default Home;
