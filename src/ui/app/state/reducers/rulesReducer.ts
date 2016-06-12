import {
  Action,
  ActionReducer
} from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { GET_RULES_SUCCESS } from '../actions/rulesActions';
import { AppState } from '../index';
import { IInRule } from '../../interfaces/IInRule';

export interface RulesState {
  list: IInRule[];
}

const initialState: RulesState = {
  list: []
};

const actionHandlerMap: Map<string, ActionReducer<RulesState>> = new Map();

export const rulesReducer: ActionReducer<RulesState> = (state: RulesState = initialState, action: Action): RulesState => {
  if (actionHandlerMap.has(action.type)) {
    return actionHandlerMap.get(action.type)(state, action);
  } else {
    return state;
  }
};

actionHandlerMap.set(GET_RULES_SUCCESS, (state: RulesState, action: Action): RulesState => {
  let { payload } = action;

  return Object.assign(
    {},
    state,
    { list: payload }
  );
});

export function getAllRules() {
  return (stateObservable: Observable<AppState>) => stateObservable
    .select((state: AppState): IInRule[] => state.rules.list);
}
