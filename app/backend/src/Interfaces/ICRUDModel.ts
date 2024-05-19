import IExample from './IExample';

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>;
  findById(id: IExample): Promise<T | null>;
}
