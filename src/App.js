import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route
          exact
          path="/productdetail/:id"
          render={ (props) => <ProductDetail { ...props } id={ id } /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;

App.propTypes = {
  id: propTypes.string,
}.isRequired;
