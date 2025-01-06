import { Module, Global } from '@nestjs/common';
import { MailService } from './service/mail.service';

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('appConfig.mailHost'),
          secure: false,
          port: configService.get('appConfig.mailPort'),
          auth: {
            user: configService.get('appConfig.mailUser'),
            pass: configService.get('appConfig.mailPassword')
          }
        },
        defaults: {
          from: `no reply <no-reply>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          }
        },

      }),
    })
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
