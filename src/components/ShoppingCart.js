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
        {productsOnlocalStorage ? (
          <div>
            <p data-testid="shopping-cart-product-quantity">
              {`Quantidade de items: ${productsOnlocalStorage.length}`}
            </p>
            {productsOnlocalStorage.map((product) => (
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

                {/* Div dedicada para diminuir ou aumentar a quantidade do produto */}
                <div className="quantidade">
                  <button
                    type="submit"
                    data-testid="product-decrease-quantity"
                  >
                    ➖
                  </button>
                  <p>1</p>
                  <button
                    type="submit"
                    data-testid="product-increase-quantity"
                  >
                    ➕
                  </button>
                </div>

                {/* Botão de remover item da lista */}
                <button
                  type="submit"
                  data-testid="remove-product"
                >
                  ✖️ Remover
                </button>

                <br />
                <br />
                <br />

              </section>
            ))}
            <p>Preço total da sua compra :</p>
          </div>
        )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </section>

    );
  }
}
export default ShoppingCart;
