export interface AuthResponseI {
  token: string;
  refreshToken: string;
  user: {
    idAdministrator: string;
    name: string;
    lastName: string;
    email: string;
    cellphone: string;
    birthday: Date;
    state: boolean;
    // otros campos que desees incluir
  };
}
