import { Injectable, OnModuleInit, Inject, BadRequestException } from "@nestjs/common";

// Google Auth
import { OAuth2Client } from 'google-auth-library';

// Configurations
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';

// dto
import { GoogleAuthDto } from '../dtos/google.auth.dto';
import { UserService } from '../../../user/services/user.service';
import { TokenService } from '../../service/token.service';

@Injectable()
export class Google implements OnModuleInit {
  private oauth2Client: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject()
    private readonly userService: UserService,
    @Inject()
    private readonly tokenService: TokenService,
  ) {}

  onModuleInit(): any {
    this.oauth2Client = new OAuth2Client(
      this.jwtConfiguration.googleClientId,
      this.jwtConfiguration.googleClientId,
    );
  }

  public async verifyGoogleToken(googleAuthDto: GoogleAuthDto): Promise<any> {
    try {
      // verify the Google token
      const tokenInfo = googleAuthDto.googleToken;

      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokenInfo,
      });

      // extract payload
      const { email, sub: googleId } = ticket.getPayload();

      // check if the user exists in the database
      const user = await this.userService.findOneByGoogleId(googleId);

      // if the user exists, generate a JWT token and return it
      if (user !== null) {
        const { accessToken, refreshToken } =
          await this.tokenService.generateToken(user);
        return {
          accessToken,
          refreshToken,
        };
      }
      // if the user does not exist, create a new user and generate a JWT token and return
      const userDto = {
        name: email.slice(0, email.indexOf('@')),
        email,
        googleId,
      };
      const newUser = await this.userService.createGoogleUser(userDto);
      const { accessToken, refreshToken } =
        await this.tokenService.generateToken(newUser);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      // throw an error if the token is invalid
      throw new BadRequestException('Invalid token', {
        description: 'The token is invalid',
      })
    }
  }
}
