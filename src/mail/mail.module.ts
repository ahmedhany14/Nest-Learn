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
          host: configService.get<string>('appConfig.mailHost'),
          port: configService.get<number>('appConfig.mailPort'),
          secure: false,

          auth: {
            user: configService.get(<string>'appConfig.mailUser'),
            pass: configService.get<string>('appConfig.mailPassword')
          }
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('appConfig.mailUser')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({
            inlineCssEnabled: true, // inline your css
          }),
          options: {
            strict: false,
          }
        },
        debug: true,
        logger: true,
        connectionTimeout: 5000,
        greetingTimeout: 5000,
      }),
    })
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
