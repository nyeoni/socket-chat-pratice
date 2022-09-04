import IComponent from '../interface/IComponent.js';
export default class Router {
  #routes: Route[];
  constructor() {
    this.#routes = [];
  }
  addRoute(route: Route) {
    this.#routes.push(route);
  }
  getRoutes() {
    this.#routes.forEach((route: Route) => {
      console.log(route);
    });
  }
  static pathToRegex(path: string): RegExp {
    // ^ : start, path.replace(/\//g, "\\/"): / to \\/ ??? unknown result....
    // replace(/:\w+/g, '(.+)'): , $: end
    return new RegExp(
      '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
    );
  }
  static getParams = (match: {route: Route; result: any}) => {
    if (!match.result) return [];
    const values = match.result?.slice(1);
    const keys = Array.from(match.route.getPath().matchAll(/:(\w+)/g)).map(
      result => result[1]
    );
    const params: string[][] = [];
    keys.forEach((key, i) => {
      params.push([key, values[i]]);
    });
    return params;
  };
  render() {
    const matchRoutes = this.#routes.map(route => {
      return {
        route: route,
        result: location.pathname.match(Router.pathToRegex(route.getPath())),
      };
    });
    const match = matchRoutes.find(route => route.result !== null) ?? {
      route: this.#routes[0],
      result: [location.pathname],
    };
    const view = match.route.getView(Router.getParams(match));
    return view.getHTML();
  }
}

export class Route {
  #path: string;
  #component: typeof IComponent;
  constructor(path: string, component: typeof IComponent) {
    this.#path = path;
    this.#component = component;
  }
  getComponent() {
    return this.#component;
  }
  getView(params: Object) {
    return new this.#component(params);
  }
  getPath() {
    return this.#path;
  }
}
