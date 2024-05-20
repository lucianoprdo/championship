import IExample from './IExample';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>;
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>;
  findById(id: IExample): Promise<T | null>;
}
