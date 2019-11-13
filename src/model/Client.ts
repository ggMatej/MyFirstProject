export interface Client {
  id: string;
  name: string;
  email: string;
}

export class Client {
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
