import React from 'react';
import { getCategories } from '../services/api';

class Category extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories.map((elemento) => (
          <section key={ elemento.id }>
            <label htmlFor={ elemento.id }>
              <input
                name="categories"
                type="radio"
                id={ elemento.id }
                data-testid="category"
              />
              {elemento.name}
            </label>
          </section>
        ))}
      </div>
    );
  }
}

export default Category;
