type NeedState<T> = (newValue?: T | ((prev: T) => T | void)) => T;

export function needToLoop<T>(
  array: T[] | NeedState<T[]>,
  callback: (eachData: T, eachIndex?: number) => void,
): any[] {
  return [];
}

type User = { id: number; name: string };
declare const users: NeedState<User[]>;

needToLoop(users, (user) => {
  console.log(user.name); 
});
