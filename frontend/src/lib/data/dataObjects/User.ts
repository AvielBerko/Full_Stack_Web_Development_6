import { getList, getOne } from "../loders/mainLoader/getLoader";
import Album from "./Album";
import DataObject, { DataObjectType } from "./DataObject";
import Todo from "./Todo";
import Post from "./Post";


export type UserObjectType = Partial<
  DataObjectType & {
    username: string;
    city: string;
    companyName: string;
    email: string;
  }
>;

export default class User extends DataObject {
  protected _username?: string;
  protected _city?: string;
  protected _companyName?: string;
  protected _email?: string;

  constructor({
    id,
    username,
    city,
    companyName,
    email,
  }: UserObjectType) {
    super({ id });
    this._username = username;
    this._city = city;
    this._companyName = companyName;
    this._email = email;
  }

  public static PATH = "users";

  override get path(): string {
    return "users";
  }

  get username(): string | undefined {
    return this._username;
  }

  set username(username: string | undefined) {
    this._username = username;
  }

  get city(): string | undefined {
    return this._city;
  }

  set city(city: string | undefined) {
    this._city = city;
  }

  get companyName(): string | undefined {
    return this._companyName;
  }

  set companyName(companyName: string | undefined) {
    this._companyName = companyName;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(email: string | undefined) {
    this._email = email;
  }

  public override toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as Object),
      username: this._username,
      city: this._city,
      companyName: this._companyName,
      email: this._email,
    };
  }

  public override fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as UserObjectType;
    this._username = objTyped.username;
    this._city = objTyped.city;
    this._companyName = objTyped.companyName;
    this._email = objTyped.email;
  }

  public get albums(): Promise<Album[]> {
    return getList(`${this.fullPath}/${Album.PATH}`).then((albums: any[]) =>
      albums.map((album) => new Album(album))
    );
  }

  public get todos(): Promise<Todo[]> {
    return getList(`${this.fullPath}/${Todo.PATH}`).then((todos: any[]) =>
      todos.map((todo) => new Todo(todo))
    );
  }

  public get posts(): Promise<Post[]> {
    return getList(`${this.fullPath}/${Post.PATH}`).then((posts: any[]) =>
      posts.map((post) => new Post(post))
    );
  }

  public get role(): Promise<boolean> {
    return getOne(`roles/${this.id}`).then((role: any) => role[0].isAdmin as boolean);
  }

  public async logout(): Promise<any> {
    return getOne(`${this.fullPath}/logout`).then((res: any) => res.json());
  }
}
