type NeedState<T> = (newValue?: T | ((prev: T) => T | void)) => T;

type ExtractItem<T> = T extends NeedState<infer U> 
  ? U extends any[] ? U[number] : never
  : T extends any[] ? T[number] : never;

export function needToLoop<T extends any[] | NeedState<any[]>>(
  array: T,
  callback: (eachData: ExtractItem<T>, eachIndex?: number) => Node,
): any[] {
  return [];
}

type User = { id: number; name: string };
declare const users: NeedState<User[]>;

needToLoop(users, (user) => {
  console.log(user.name); 
});
