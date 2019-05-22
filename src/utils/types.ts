import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';
import { ActionType } from 'typesafe-actions';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type ActionTypeWithout<T, K extends keyof T> = ActionType<Omit<T, K>>;

export type StackScreenComponent<TProps = {}, TParams = {}, TOptions = NavigationStackScreenOptions> = NavigationScreenComponent<TParams, TOptions, TProps>;
