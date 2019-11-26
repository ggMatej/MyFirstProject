export interface Review {
  id: string;
  title: string;
  body: string;
  projectId: string;
}

export class Review {
  constructor(title: string, body: string, projectId: string) {
    this.title = title;
    this.body = body;
    this.projectId = projectId;
  }
}
