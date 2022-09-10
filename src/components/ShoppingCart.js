import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    productsOnlocalStorage: [],
  };

  componentDidMount() {
    this.getFromLocalStorage();
  }

  getFromLocalStorage() {
    const response = JSON.parse(localStorage.getItem('product'));
    this.setState({ productsOnlocalStorage: response });
  }

  render() {
    const { productsOnlocalStorage } = this.state;
    return (
      <section>
        <div>
          <p data-testid="shopping-cart-product-quantity">
            {`Quantidade de items: ${productsOnlocalStorage.length}`}
          </p>
          { productsOnlocalStorage.map((product) => (
            <section className="cart-items" key={ product.id }>
              <img
                src={ product.thumbnail }
                alt={ product.title }
                data-testid="shopping-cart-product-image"
              />
              <p data-testid="shopping-cart-product-name">
                Nome:
                {product.title}
              </p>
              <p>{product.warranty}</p>
              <p data-testid="shopping-cart-product-price">
                Preço:
                {product.price}
              </p>
            </section>
          ))}
        </div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </section>

    );
  }
}
export default ShoppingCart;
