import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entite/user.entitie';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    async sendWelcomeMail(user: User): Promise<void> {
        await this.mailerService.sendMail({
            from: `Onboarding Team<support@${this.configService.get('appConfig.mailUser')}>`,
            to: user.email,
            subject: 'Welcome to our platform',
            template: './welcome',
            context: {
                username: user.name,
                email: user.email,
                loginUrl: 'http://localhost:3000/login',
            },
        }).then(() => {
            console.log('Email sent successfully');
        }).catch((error) => {
            console.error('Error sending email', error);
        });
    }
}