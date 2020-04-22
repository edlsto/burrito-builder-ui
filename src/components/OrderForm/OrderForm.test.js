import React from "react";
import OrderForm from "./OrderForm";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { postNewOrder } from "../../apiCalls";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
jest.mock("../../apiCalls");

describe("Order Form tests", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      orders: [],
    };
    postNewOrder.mockResolvedValue([
      {
        id: 1,
        name: "Ed",
        ingredients: [
          "beans",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno",
        ],
      },
    ]);
  });

  it("should render the text we expect", () => {
    const store = createStore(rootReducer, initialState);
    const { getByText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const beans = getByText("beans");
    const steak = getByText("steak");
    const carnitas = getByText("carnitas");
    expect(beans).toBeInTheDocument();
    expect(steak).toBeInTheDocument();
    expect(carnitas).toBeInTheDocument();
  });

  it("should enable button after two ingredients selected", async () => {
    const store = createStore(rootReducer, initialState);
    const { getByText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const submitOrder = getByText("Submit Order");
    expect(submitOrder).toBeDisabled();
    const beans = getByText("beans");
    const steak = getByText("steak");

    fireEvent.click(beans);
    fireEvent.click(steak);
    expect(submitOrder).not.toBeDisabled();
  });

  it("should receive input in form", async () => {
    const store = createStore(rootReducer, initialState);
    const { getByPlaceholderText, getByDisplayValue } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const nameForm = getByPlaceholderText("Name");
    expect(nameForm).toBeInTheDocument();
    fireEvent.change(nameForm, { target: { value: "Ed" } });
    const nameValue = getByDisplayValue("Ed");
    expect(nameValue).toBeInTheDocument();
  });

  it("should post order when button clicked", async () => {
    const store = createStore(rootReducer, initialState);
    const { getByText, debug } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const submitOrder = getByText("Submit Order");
    expect(submitOrder).toBeDisabled();
    const beans = getByText("beans");
    const steak = getByText("steak");

    fireEvent.click(beans);
    fireEvent.click(steak);
    fireEvent.click(submitOrder);
    await waitFor(() => expect(submitOrder).toBeDisabled());
    expect(postNewOrder).toHaveBeenCalled();
  });
});
