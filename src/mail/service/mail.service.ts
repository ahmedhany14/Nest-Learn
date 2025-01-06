import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entite/user.entitie';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { join } from 'path';
import { error } from 'console';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) { }

    private createTransporter() {
        return nodemailer.createTransport({
            host: this.configService.get('appConfig.mailHost'),
            port: this.configService.get('appConfig.mailPort'),
            secure: false,
            auth: {
                user: this.configService.get('appConfig.mailUser'),
                pass: this.configService.get('appConfig.mailPassword')
            },
            default: {
                from: this.configService.get<string>('appConfig.mailUser'),
            },
            template: {
                dir: join(__dirname, '../templates'),
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                }
            },
            debug: true,
            logger: true,
            connectionTimeout: 10000,
            greetingTimeout: 10000
        });
    }

    async sendWelcomeMail(user: User) {
        const transporter = this.createTransporter();
        await transporter.sendMail({
            from: this.configService.get<string>('appConfig.mailUser'),
            to: "ah7608867@gmail.com",
            subject: 'Welcome to our platform',
            template: './welcome',
            context: {
                username: user.name,
                email: user.email,
                loginUrl: 'http://localhost:3000/login',
            },
        }, (error, info) => {
            if (error) {
                console.log(error);
            } else
                console.log('Message sent: %s', info.messageId);
        });
    }
}