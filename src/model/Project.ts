export interface Project {
  id: string;
  title: string;
  description: string;
}

export class Project {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
