export interface AdministratorI {
  idAdministrator?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  cellphone: string;
  birthday: Date;
  state: boolean;
  login?: any; // Ajusta esto según tu entidad LoginEntity si es necesario
}
