import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  private readonly employees: CreateEmployeeDto[] = [
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Doe",
      phone: "0987654321",
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);

    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return this.employees.find((employee) => employee.id === id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: number) {
    this.employees.splice(
      this.employees.findIndex((employee) => employee.id === id)
    );

    return this.employees;
  }
}
