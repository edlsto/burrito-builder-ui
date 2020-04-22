import { orders } from "./orders";

describe("orders reducer tests", () => {
  it("should return default state", () => {
    const result = orders(undefined, {});
    expect(result).toEqual([]);
  });

  it("should set orders", () => {
    const expectedResult = [
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
    ];

    const result = orders([], {
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
    });
    expect(result).toEqual(expectedResult);
  });

  it("should add order", () => {
    const expectedResult = [
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
    ];
    const result = orders(
      [
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
      ],
      {
        order: {
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
        type: "ADD_ORDER",
      }
    );
    expect(result).toEqual(expectedResult);
  });
});
