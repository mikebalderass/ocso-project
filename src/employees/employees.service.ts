import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id,
      },
    });
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id,
    });

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });
    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id,
    });
    return {
      message: "Employee deleted",
    };
  }
}
