import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it('should not be able to add a new specification to a non existing car', async () => {
    expect(async () => {
      const car_id = '123456';
      const specifications_id = ['654321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    // Create a car
    const car = await carsRepositoryInMemory.create({
      name: 'A23',
      description: 'Car bom',
      daily_rate: 200,
      license_plate: '123-ABCD',
      fine_amount: 360,
      brand: 'BMW',
      category_id: '40ce9ced-73be-4d0d-98fe-b0c01ac2e92a',
    });

    // Creates a specification
    const specification = await specificationRepositoryInMemory.create({
      description: 'Specification test',
      name: 'Specification 1',
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications).toHaveLength(1);
  });
});
