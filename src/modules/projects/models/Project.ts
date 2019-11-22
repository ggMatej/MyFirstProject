export interface Project {
  id: string;
  clientId: string;
  title: string;
  description: string;
}

export class Project {
  constructor(title: string, description: string, clientId: string) {
    this.title = title;
    this.description = description;
    this.clientId = clientId;
  }
}
