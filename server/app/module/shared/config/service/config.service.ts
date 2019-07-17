import { Injectable } from '@nestjs/common';


// TODO: extract to shared library
@Injectable()
export class ConfigService {
  constructor() {}

  getEnvironment(): any {
    return process.env;
  }

  getBoolean(
    variableName: string,
    defaultValue?: boolean,
  ): boolean {
    const value = this.getEnvVar(variableName, defaultValue);

    const errorMessage = `Environment Variable ${variableName} does not contain a valid boolean`;

    return this.parseBoolean(value, errorMessage);
  }

  getInteger(
    variableName: string,
    defaultValue?: number,
  ): number {
    const value = this.getEnvVar(variableName, defaultValue);

    const errorMessage = `Environment Variable ${variableName} does not contain a valid integer`;

    return this.parseInt(value, errorMessage);
  }

  getString(
    variableName: string,
    defaultValue?: string,
  ): string {
    return this.getEnvVar(variableName, defaultValue);
  }

  private getEnvVar(
    variableName: string,
    defaultValue?: boolean | number | string,
  ): string {
    const value = this.getEnvironment()[variableName] || defaultValue;

    if (value === undefined) {
      throw new Error(`Environment Variable ${variableName} must be set!`);
    }

    return value;
  }

  private isValidBoolean(value: string | boolean): boolean {
    return (
      value === 'true' || value === 'false' || value === true || value === false
    );
  }

  private isValidInteger(value: string): boolean {
    const parsedInt = parseInt(value, 10);
    return !isNaN(parsedInt);
  }

  private parseBoolean(value: string, errorMessage?: string): boolean {
    if (!this.isValidBoolean(value)) {
      const message = errorMessage || `${value} is not a valid boolean!`;
      throw new Error(message);
    }

    return this.convertStringToBoolean(value);
  }

  private parseInt(value: string, errorMessage?: string): number {
    if (!this.isValidInteger(value)) {
      const message = errorMessage || `${value} is not a valid int!`;
      throw new Error(message);
    }

    return parseInt(value, 10);
  }

  private convertStringToBoolean(value: string) {
    return value === 'true';
  }
}
