import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
// import { ResetPassword } from './entities/resetPassword.entity';
// import { MailerService } from '@nestjs-modules/mailer';
import 'dotenv/config';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,

    // @InjectRepository(ResetPassword)
    // private resetPasswordRepository: Repository<ResetPassword>,

    private readonly entityManager: EntityManager,
    // private readonly mailerService: MailerService,
  ) {}
  testRoute() {
    return 'auth route ok';
  }
  async validateUser(auth: SignInDto) {
    const user = await this.userService.findWhereUsername(auth.username);
    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    const compare_res = await bcrypt.compare(auth.password, user.pasw_hash);

    if (compare_res) return user;
    else return;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async signUp(dto: SignUpDto) {
    const user = await this.userService.createUser(dto);
    delete user.pasw_hash;
    return user;
  }

//   async sendResetPasswordEmail(email: string) {
//     const user = await this.userService.findWhereEmail(email);
//     if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

//     const token = Math.floor(100000 + Math.random() * 900000).toString();
//     const resetPassword = this.resetPasswordRepository.create({
//       token,
//       user_id: user.id,
//     });

//     await this.entityManager.save(resetPassword);

//     return await this.sendEmail(email, token);
//   }

//   async findWhereResetPasswordToken(token: string) {
//     return await this.resetPasswordRepository.findOne({
//       where: {
//         token,
//       },
//     });
//   }

//   async resetPassword(token: string, newPassword: string) {
//     const user = await this.findWhereResetPasswordToken(token);
//     if (!user)
//       throw new HttpException('Token Is Invalid', HttpStatus.NOT_FOUND);

//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const passw_hash = await bcrypt.hash(newPassword, salt);

//     await this.userService.updateUser(user.user_id, {
//       pasw_hash: passw_hash,
//       pasw_salt: salt,
//     });

//     await this.resetPasswordRepository.delete({
//       token,
//     });

//     return {
//       message: 'Password Reset',
//     };
//   }

//   async sendEmail(email: string, token: string) {
//     await this.mailerService.sendMail({
//       to: email,
//       subject: 'Reset Password',
//       template: 'reset-password',
//       context: {
//         token,
//       },
//     });

//     return {
//       message: 'Email Sent',
//     };
//   }
}
