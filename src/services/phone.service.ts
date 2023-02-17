import { Phone } from '../entities/phone.entity';
import { AppDataSource } from '../utils/data-source';

const userRepository = AppDataSource.getRepository(Phone);

export const createPhone = async (input: Partial<Phone>) => {
  return await userRepository.save(userRepository.create(input));
};

export const getAllPhones = async () => {
  return await userRepository.find();
};

