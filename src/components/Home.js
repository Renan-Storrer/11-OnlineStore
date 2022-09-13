import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    products: [],
    categories: [],
    productsOnlocalStorage: [],
  };

  componentDidMount() {
    this.fetchApi();
    this.getFromLocalStorage();
  }

  getFromLocalStorage() {
    const response = JSON.parse(localStorage.getItem('product')) || [];
    this.setState({ productsOnlocalStorage: response });
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
                <section className="product-card" key={ product.id }>
                  <Link
                    to={ `/productdetail/${product.id}` }
                    className="poducts-card"
                    data-testid="product-detail-link"
                  >
                    <div data-testid="product">
                      <img src={ product.thumbnail } alt={ product.title } />
                      <p>{ product.title }</p>
                      <p>{`R$ ${product.price}`}</p>
                      <br />
                    </div>
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.addToCart(product) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </section>
              ))
            )
            : <p>Nenhum produto foi encontrado</p>
        }
      </>
    );
  }
}

export default Home;
