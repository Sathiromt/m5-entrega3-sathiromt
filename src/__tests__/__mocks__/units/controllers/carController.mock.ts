const carCreateControllerMock = {
  body: {
    name: "Carro 1",
    brand: "Brand 1",
    description: "Description 1",
    year: 2020,
    km: 0,
  },
  expectedValue: {
    id: expect.any(String),
    name: "Carro 1",
    description: "Description 1",
    brand: "Brand 1",
    year: 2020,
    km: 0,
  },
};

const carReadControllerMock = {
  body: [
    {
      name: "Carro 1",
      description: null,
      brand: "Brand 1",
      year: 2020,
      km: 0,
    },
    {
      name: "Carro 2",
      description: "Description 2",
      brand: "Brand 2",
      year: 2019,
      km: 0,
    },
    {
      name: "Carro 3",
      description: "Description 3",
      brand: "Brand 3",
      year: 2022,
      km: 0,
    },
    {
      name: "Carro 4",
      description: null,
      brand: "Brand 4",
      year: 2023,
      km: 0,
    },
  ],
  expectedValue: [
    {
      id: expect.any(String),
      name: "Carro 1",
      description: null,
      brand: "Brand 1",
      year: 2020,
      km: 0,
    },
    {
      id: expect.any(String),
      name: "Carro 2",
      description: "Description 2",
      brand: "Brand 2",
      year: 2019,
      km: 0,
    },
    {
      id: expect.any(String),
      name: "Carro 3",
      description: "Description 3",
      brand: "Brand 3",
      year: 2022,
      km: 0,
    },
    {
      id: expect.any(String),
      name: "Carro 4",
      description: null,
      brand: "Brand 4",
      year: 2023,
      km: 0,
    },
  ],
};

const carReadOneControllerMock = {
  body: {
    name: "Carro 1",
    description: null,
    brand: "Brand 1",
    year: 2020,
    km: 0,
  },
  expectedValue: {
    id: expect.any(String),
    name: "Carro 1",
    description: null,
    brand: "Brand 1",
    year: 2020,
    km: 0,
  },
};

const carUpdateControllerMock = {
  payload: { ...carCreateControllerMock.body },
  body: {
    name: "Carro 5",
    description: "Description 1",
    year: 2024,
  },
  expectedValue: {
    id: expect.any(String),
    name: "Carro 5",
    description: "Description 1",
    brand: "Brand 1",
    year: 2024,
    km: 0,
  },
};

const carDeleteControllerMock = {
  body: {
    name: "Carro 1",
    description: null,
    brand: "Brand 1",
    year: 2020,
    km: 0,
  },
};

export {
  carCreateControllerMock,
  carReadControllerMock,
  carReadOneControllerMock,
  carUpdateControllerMock,
  carDeleteControllerMock,
};
