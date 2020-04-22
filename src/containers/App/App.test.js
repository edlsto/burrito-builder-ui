import React from "react";
import App from "./App";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { postNewOrder, getOrders } from "../../apiCalls";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
jest.mock("../../apiCalls");

describe("app tests", () => {
  beforeEach(() => {
    getOrders.mockResolvedValue({
      orders: [
        {
          id: 1,
          name: "Ed",
          ingredients: ["lettuce", "carnitas", "queso fresco", "jalapeno"],
        },
        {
          id: 2,
          name: "hello",
          ingredients: [
            "pico de gallo",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno",
          ],
        },
      ],
    });
    postNewOrder.mockResolvedValue({
      id: 3,
      name: "order3",
      ingredients: ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"],
    });
  });
  it("should render the text we expect", async () => {
    const store = createStore(rootReducer);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => expect(getByText("hello")).toBeInTheDocument());
  });

  it("should display an order after submitted", async () => {
    const store = createStore(rootReducer);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => expect(getByText("hello")).toBeInTheDocument());
    const submitOrder = getByText("Submit Order");
    const beans = getByText("beans");
    const steak = getByText("steak");

    fireEvent.click(beans);
    fireEvent.click(steak);
    const nameForm = getByPlaceholderText("Name");
    fireEvent.change(nameForm, { target: { value: "order3" } });
    fireEvent.click(submitOrder);
    await waitFor(() => expect(getByText("order3")).toBeInTheDocument());
  });
});
