import {
  requestsReducer,
  RequestsState,
  rulesReducer,
  RulesState
} from './reducers/index';

export interface AppState {
  requests: RequestsState;
  rules: RulesState;
}

export const STATE = {
  requests: requestsReducer,
  rules: rulesReducer
};
