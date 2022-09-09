import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    products: [],
    categories: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

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

  fetchApi = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  categorySelect = async (event) => {
    const { target: { id } } = event;
    const getPro = await getProductsFromCategoryAndQuery(id);
    this.setState({
      products: getPro.results,
    });
  };

  render() {
    const { products, categories } = this.state;
    return (
      <>
        <div>
          {categories.map((elemento) => (
            <section key={ elemento.id }>
              <label htmlFor={ elemento.id }>
                <input
                  name="categories"
                  type="radio"
                  id={ elemento.id }
                  data-testid="category"
                  onChange={ this.categorySelect }
                />
                {elemento.name}
              </label>
            </section>
          ))}
        </div>

        <div id="barraDePesquisa">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>

          <label htmlFor="search">
            Busca :
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
