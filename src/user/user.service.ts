import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async getAllUser() {
    return await this.userRepository.find({});
  }
  async createUser(user) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passw_hash = await bcrypt.hash(user.password, salt);

    const new_user = this.userRepository.create({
      id: uuidv4(),
      email: user.email,
      name: user.name,
      username: user.username,
      pasw_hash: passw_hash,
      pasw_salt: salt,
    });

    return await this.entityManager.save(new_user);
  }

  async getUser(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findWhereUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async findWhereEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async updateUser(id: string, userUpdate) {
    const user = await this.getUser(id);

    if (!user) return;

    const updated_user = {
      ...user,
      ...userUpdate,
    };

    return this.userRepository.save(updated_user);
  }

  async deleteUser(id: string) {
    const user = await this.getUser(id);

    if (!user) return;

    return this.userRepository.remove(user);
  }

  async authUser(user: any) {
    const user_data = await this.userRepository.findOne({
      where: { name: user.name },
    });

    if (!user_data) return false;

    const compare_res = await bcrypt.compare(
      user.password,
      user_data.pasw_hash,
    );

    return compare_res;
  }
}