import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Description car',
      daily_rate: 300,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with an existent license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Description car',
        daily_rate: 300,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Description car',
        daily_rate: 300,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a car with default availability as true', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description car',
      daily_rate: 300,
      license_plate: 'DEF-1234',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
