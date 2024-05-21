import IExample from './IExample';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>;
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>; // Aqui mudamos o tipo do parâmetro para number
}

export interface ICRUDModelUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>; // Aqui mudamos o tipo do parâmetro para number
}

export interface ICRUDModelDeleter {
  delete(id: number): Promise<number>; // Aqui mudamos o tipo do parâmetro para number
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>,
    ICRUDModelReader<T>,
    ICRUDModelUpdater<T>,
    ICRUDModelDeleter {}
