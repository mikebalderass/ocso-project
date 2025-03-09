import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeesModule } from "./employees/employees.module";
import { ProductsModule } from "./products/products.module";
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from "./providers/providers.module";
import { ManagersModule } from "./managers/managers.module";
import { LocationsModule } from "./locations/locations.module";
import { RegionsModule } from "./regions/regions.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: process.env.port ? +process.env.port : 3000,
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    LocationsModule,
    ManagersModule,
    RegionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
