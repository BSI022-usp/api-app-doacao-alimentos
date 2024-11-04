import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('NEON_POSTGRES_HOST'),
        port: configService.get('NEON_POSTGRES_PORT'),
        username: configService.get('NEON_POSTGRES_USER'),
        password: configService.get('NEON_POSTGRES_PASSWORD'),
        database: configService.get('NEON_POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        ssl: true,
        // entities: [Marcas],
        // synchronize: true, // Be cautious about using synchronize in production
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
