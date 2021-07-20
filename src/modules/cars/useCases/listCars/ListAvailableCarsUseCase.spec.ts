import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 200,
      license_plate: 'AFFD-123',
      fine_amount: 360,
      brand: 'Car Brand',
      category_id: 'category id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car1]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car2 = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 200,
      license_plate: 'AFFD-123',
      fine_amount: 360,
      brand: 'Car Brand 2',
      category_id: 'category id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car Brand 2',
    });

    expect(cars).toEqual([car2]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car3 = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 200,
      license_plate: 'AFFD-123',
      fine_amount: 360,
      brand: 'Car Brand 2',
      category_id: 'category id',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Car3',
    });

    expect(cars).toEqual([car3]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car4 = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'Car description',
      daily_rate: 200,
      license_plate: 'AFFD-123',
      fine_amount: 360,
      brand: 'Car Brand 2',
      category_id: '1234567890',
    });

    const cars = await listCarsUseCase.execute({
      category_id: '1234567890',
    });

    expect(cars).toEqual([car4]);
  });
});
