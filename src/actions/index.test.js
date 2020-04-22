import * as actions from "./index";

describe("actions tests", () => {
  it("GET_ORDERS should have the correct type and payload", () => {
    const expectedResult = {
      orders: [
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
        {
          id: 2,
          name: "Ed2",
          ingredients: [
            "steak",
            "pico de gallo",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno",
          ],
        },
      ],
      type: "SET_ORDERS",
    };
    const result = actions.setOrders([
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
      {
        id: 2,
        name: "Ed2",
        ingredients: [
          "steak",
          "pico de gallo",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno",
        ],
      },
    ]);
    expect(result).toEqual(expectedResult);
  });

  it("ADD_ORDER should have the correct payload and type", () => {
    const expectedResult = {
      order: {
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
      type: "ADD_ORDER",
    };
    const result = actions.addOrder({
      id: 1,
      name: "Ed",
      ingredients: ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"],
    });
    expect(result).toEqual(expectedResult);
  });
});
