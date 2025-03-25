export const arrTest = [
  { items: [{ price: 10, quantity: 10 }], expected: 100 },

  { items: [{ price: 10, quantity: 1 }], expected: 10 },

  {
    items: [
      { price: 10, quantity: 1 },
      { price: 10, quantity: 9 }
    ],
    expected: 100
  },

  {
    items: [
      { price: 10, quantity: 0 },
      { price: 10, quantity: 9 }
    ],
    expected: 90
  },

  {
    items: [{ price: 100, quantity: 10 }],
    discount: 100,
    error: 'Процент скидки должен быть от 0 до 99'
  },

  {
    items: [{ price: 10, quantity: 10 }],
    discount: 10,
    expected: 90
  },

  {
    items: [{ price: 100, quantity: 10 }],
    discount: '100',
    error: 'Скидка должна быть числом'
  }
];
