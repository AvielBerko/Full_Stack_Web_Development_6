import DataObject, { DataObjectType } from "./DataObject";



export type UserObjectType = Partial<
  DataObjectType & {
    username: string;
    password: string;
  }
>;

export default class UserPassword extends DataObject {
  protected _username?: string;
  protected _password?: string;

  constructor({
    id,
    username,
    password,
  }: UserObjectType) {
    super({ id });
    this._username = username;
    this._password = password;
  }

  public static PATH = "user_passwords";

  override get path(): string {
    return "user_passwords";
  }

  get username(): string | undefined {
    return this._username;
  }

  set username(username: string | undefined) {
    this._username = username;
  }

  get password(): string | undefined {
    return this._password;
  }

  set password(password: string | undefined) {
    this._password = password;
  }

  public override toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as Object),
      username: this._username,
      password: this._password,
    };
  }

  public override fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as UserObjectType;
    this._username = objTyped.username;
    this._password = objTyped.password;
  }
}
