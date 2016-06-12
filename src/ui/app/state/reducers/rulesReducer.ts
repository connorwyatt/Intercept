import {
  Action,
  ActionReducer
} from '@ngrx/store';
import { IInRule } from '../../interfaces/IInRule';
import { GET_RULES_SUCCESS } from '../actions/rulesActions';

const actionHandlerMap: Map<string, ActionReducer<IInRule[]>> = new Map();

export const rulesReducer: ActionReducer<IInRule[]> = (state: IInRule[] = [], action: Action): IInRule[] => {
  if (actionHandlerMap.has(action.type)) {
    return actionHandlerMap.get(action.type)(state, action);
  } else {
    return state;
  }
};

actionHandlerMap.set(GET_RULES_SUCCESS, (state: IInRule[], action: Action): IInRule[] => {
  return action.payload;
});
