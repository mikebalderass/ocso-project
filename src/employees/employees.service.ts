import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class EmployeesService {
  private readonly employees: CreateEmployeeDto[] = [
    {
      id: uuid(),
      name: "John",
      lastName: "Doe",
      phone: "1234567890",
    },
    {
      id: uuid(),
      name: "Jane",
      lastName: "Doe",
      phone: "0987654321",
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);

    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    return this.employees.find((employee) => employee.id === id);
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.employees.find((employee) => employee.id === id);

    if (!employee) {
      return null;
    }
    
    const index = this.employees.indexOf(employee);

    this.employees[index] = {
      ...employee,
      ...updateEmployeeDto,
    };

    return this.employees[index];
  }

  remove(id: string) {
    this.employees.splice(
      this.employees.findIndex((employee) => employee.id === id)
    );

    return this.employees;
  }
}
