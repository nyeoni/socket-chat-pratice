interface IComponent {
  params: Object;
  getHTML: () => Promise<string>;
  getScript: () => Promise<Function[]>;
  runScripts: () => void;
  render(): unknown;
}

export default class implements IComponent {
  private html: string;
  private scripts: Function[];
  params: Object;
  constructor(params: Object) {
    this.html = '';
    this.scripts = [];
    this.params = params;
  }
  setTitle(title: string) {
    document.title = title;
  }
  // get default page html
  async getHTML() {
    return this.html;
  }
  // get all script functions related to the page
  async getScript() {
    return this.scripts;
  }
  // append html
  appendHTML(html: string) {
    this.html += html;
  }
  // append more script func
  appendScript(...sc: Function[]) {
    for (const script of sc) {
      this.scripts.push(script);
    }
  }
  runScripts() {
    for (const script of this.scripts) {
      script();
    }
  }
  // dispatch another view
  async dispatch(view: IComponent) {
    view.render();
    const html = await view.getHTML();

    this.appendHTML(html);
    this.appendScript(...(await view.getScript()));
  }
  // custom your element with above functions
  // return [html, script] set
  render() {
    // return [this.getHTML, this.getScript];
  }
}
