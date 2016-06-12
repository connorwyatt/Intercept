import { Action, ActionReducer } from '@ngrx/store';
import {
  NEW_REQUEST_STARTS,
  NEW_REQUEST_ENDS,
  CLEAR_REQUESTS
} from '../actions/requestActions';
import { IInRequest } from '../../interfaces/IInRequest';

const actionHandlerMap: Map<string, ActionReducer<IInRequest[]>> = new Map();

export const requestsReducer: ActionReducer<IInRequest[]> = (state: IInRequest[] = [], action: Action): IInRequest[] => {
  if (actionHandlerMap.has(action.type)) {
    return actionHandlerMap.get(action.type)(state, action);
  } else {
    return state;
  }
};

function newRequestStarts(state: IInRequest[], action: Action): IInRequest[] {
  let { payload } = action;

  return [...payload, ...state].slice(0, 50000);
}

actionHandlerMap.set(NEW_REQUEST_STARTS, newRequestStarts);

function newRequestEnds(state: IInRequest[], action: Action): IInRequest[] {
  let { payload } = action;

  payload.forEach((requestEnd: IInRequest) => {
    let requestStartIndex = state.findIndex((request: IInRequest) => {
      return request.id === requestEnd.id;
    });

    let requestStart = state[requestStartIndex];

    let newRequest = Object.assign({}, requestStart, requestEnd);

    state.splice(requestStartIndex, 1, newRequest);
  });

  return state;
}

actionHandlerMap.set(NEW_REQUEST_ENDS, newRequestEnds);

function clearRequests(): IInRequest[] {
  return [];
}

actionHandlerMap.set(CLEAR_REQUESTS, clearRequests);
