const redisMock = {
  get: jest.fn(),
  set: jest.fn(),
  setex: jest.fn(),
  del: jest.fn(),
  quit: jest.fn(),
  on: jest.fn(),
  connect: jest.fn(),
}

export default jest.fn(() => redisMock)
