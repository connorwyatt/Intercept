import {
  Action,
  ActionReducer
} from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import {
  NEW_REQUEST_STARTS,
  NEW_REQUEST_ENDS,
  CLEAR_REQUESTS
} from '../actions/requestsActions';
import { AppState } from '../index';
import { IInRequest } from '../../interfaces/IInRequest';

export interface RequestsState {
  list: IInRequest[];
}

const initialState: RequestsState = {
  list: []
};

const actionHandlerMap: Map<string, ActionReducer<RequestsState>> = new Map();

export const requestsReducer: ActionReducer<RequestsState> = (state: RequestsState = initialState, action: Action): RequestsState => {
  if (actionHandlerMap.has(action.type)) {
    return actionHandlerMap.get(action.type)(state, action);
  } else {
    return state;
  }
};

actionHandlerMap.set(NEW_REQUEST_STARTS, (state: RequestsState, action: Action): RequestsState => {
  let { payload } = action;

  return Object.assign(
    {},
    state,
    { list: [...payload, ...state.list].slice(0, 5000) }
  );
});

actionHandlerMap.set(NEW_REQUEST_ENDS, (state: RequestsState, action: Action): RequestsState => {
  let newState = Object.assign({}, state);
  let { payload } = action;

  payload.forEach((requestEnd: IInRequest) => {
    let newList = state.list.map((request: IInRequest) => {
      if (request.id === requestEnd.id) {
        return Object.assign({}, request, requestEnd);
      }
    });

    newState = Object.assign(
      {},
      newState,
      { list: newList }
    );
  });

  return newState;
});

actionHandlerMap.set(CLEAR_REQUESTS, (state: RequestsState): RequestsState => {
  return Object.assign(
    {},
    state,
    { list: [] }
  );
});

export function getAllRequests() {
  return (stateObservable: Observable<AppState>) => stateObservable
    .select((state: AppState): IInRequest[] => state.requests.list);
}
