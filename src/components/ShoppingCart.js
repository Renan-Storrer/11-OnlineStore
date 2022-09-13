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

  btnSum(id) {
    const { productsOnlocalStorage } = this.state;
    let qtyUpdated = [];
    productsOnlocalStorage.map((product) => {
      if (id === product.id) {
        product.qty += 1;
      }
      qtyUpdated = [...qtyUpdated, product];
      return qtyUpdated;
    });
    this.setState({ productsOnlocalStorage: qtyUpdated }, this.addtoLocalStorage);
  }

  btnSub(id) {
    const { productsOnlocalStorage } = this.state;
    let qtyUpdated = [];
    productsOnlocalStorage.map((product) => {
      if (id === product.id && product.qty > 1) {
        product.qty -= 1;
      }
      qtyUpdated = [...qtyUpdated, product];
      return qtyUpdated;
    });
    this.setState({ productsOnlocalStorage: qtyUpdated }, this.addtoLocalStorage);
  }

  removeProduct(id) {
    const { productsOnlocalStorage } = this.state;
    let qtyUpdated = [];
    qtyUpdated = productsOnlocalStorage.filter((product) => id !== product.id);
    this.setState({ productsOnlocalStorage: qtyUpdated }, this.addtoLocalStorage);
  }

  addtoLocalStorage() {
    const { productsOnlocalStorage } = this.state;
    localStorage.setItem('product', JSON.stringify(productsOnlocalStorage));
  }

  render() {
    const { productsOnlocalStorage } = this.state;
    return (
      <section>
        {productsOnlocalStorage ? (
          <div>
            <p>
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
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.btnSub(product.id) }
                  >
                    ➖
                  </button>
                  <p data-testid="shopping-cart-product-quantity">{product.qty}</p>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.btnSum(product.id) }
                  >
                    ➕
                  </button>
                </div>

                {/* Botão de remover item da lista */}
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeProduct(product.id) }
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
