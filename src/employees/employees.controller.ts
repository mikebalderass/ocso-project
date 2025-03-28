import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Employee } from "./entities/employee.entity";
import { ApiAuth } from "src/auth/decorators/api.decorator";

@ApiAuth()
@ApiTags("Employees")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Mike",
      employeeEmail: "mike@gmail.com",
      employeeLastName: "Balderas",
      employeePhoneNumber: "4871443289",
    } as Employee,
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @ApiResponse({
    status: 200,
    example: "OK",
  })
  @Post("upload")
  @ApiResponse({
    status: 200,
    example: "OK",
  })
  @UseInterceptors(FileInterceptor("file"))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return "OK";
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    example: [
      {
        employeeId: "UUID",
        employeeName: "Mike",
        employeeEmail: "",
        employeeLastName: "Balderas",
        employeePhoneNumber: "4871443289",
      } as Employee,
    ],
  })
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    example: {
      employeeId: "UUID",
      employeeName: "Mike",
      employeeEmail: "",
      employeeLastName: "Balderas",
      employeePhoneNumber: "4871443289",
    } as Employee,
  })
  @Get(":id")
  findOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string
  ) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    example: [
      {
        employeeId: "UUID",
        employeeName: "Mike",
        employeeEmail: "",
        employeeLastName: "Balderas",
        employeePhoneNumber: "4871443289",
      } as Employee,
    ],
  })
  @Get("/location/:id")
  findAllLocation(@Param("id") id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @ApiResponse({
    status: 200,
    example: {
      employeeId: "UUID",
      employeeName: "Mike",
      employeeEmail: "",
      employeeLastName: "Balderas",
      employeePhoneNumber: "4871443289",
    } as Employee,
  })
  @Patch(":id")
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    example: "OK",
  })
  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.remove(id);
  }
}
