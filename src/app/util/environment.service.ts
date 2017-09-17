import { environment } from '../../environments/environment';

export class EnvironmentService  {

  public isProd() {
    return environment.production;
  }

  public isTesting() {
    return false;//!environment.production;
  }
}
