export default class {
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
