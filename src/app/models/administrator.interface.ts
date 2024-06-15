export interface AdministratorI {
<<<<<<< HEAD
    name?: string;
    lastName?: string;
    cellphone?: number;
    birthdate?: Date;
    state?:boolean;
    email?:string;
    password?:string;
  }
=======
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
>>>>>>> 4ccf2d8432d6b75864fcab668698a3251241a1ee
