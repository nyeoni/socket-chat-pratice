interface IComponent {
  params: Object;
  getHTML: () => Promise<string>;
}

export default class implements IComponent {
  params: Object;
  constructor(params: Object) {
    this.params = params;
  }
  setTitle(title: string) {
    document.title = title;
  }
  async getHTML() {
    return '';
  }
}
