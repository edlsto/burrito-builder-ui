import React, { Component } from "react";
import { postNewOrder } from "../../apiCalls";
import { connect } from "react-redux";
import { addOrder } from "../../actions";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.name] });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await postNewOrder(this.state);
      this.props.addOrder(response);
      this.clearInputs();
    } catch (e) {
      console.log(e.message);
    }
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const validated = this.state.ingredients.length >= 1;
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          type="button"
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
          disabled={
            this.state.ingredients.filter(
              (ingredientState) => ingredientState === ingredient
            ).length >= 2
          }
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button onClick={(e) => this.handleSubmit(e)} disabled={!validated}>
          Submit Order
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addOrder: (order) => dispatch(addOrder(order)),
});

export default connect(null, mapDispatchToProps)(OrderForm);
