export class UserSignupPostDto {
  nome: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  address: UserSignupAddress = new UserSignupAddress();
}

export class UserSignupAddress {
  logradouro: string = '';
  numero: string = '';
  bairro: string = '';
  estado: string = '';
  cidade: string = '';
  cep: string = '';
}
