import apiInstance from 'src/api/axios';

export interface Flower {
  createdAt: number;
  deletedAt?: number;
  totalCount: number;
  name: string;
  id: string;
  image: string;
  description: string;
}

export const getFlowers = () => apiInstance.get<Array<Flower>>('/flower').then(res => res.data);

export const getFlower = (id: string) =>
  apiInstance.get<Flower>(`/flower/${id}`).then(res => res.data);

export const createFlower = (flower: Flower) =>
  apiInstance.post<Flower>(`/flower/`, { ...flower }).then(res => res.data);

export const updateFlower = (flower: Flower) =>
  apiInstance.put<Flower>(`/flower/${flower.id}`, { ...flower }).then(res => res.data);

export const deleteFlower = (id: string) =>
  apiInstance.delete<Flower>(`/flower/${id}`).then(res => res.data);
