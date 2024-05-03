import * as ui from "./shared/ui.reducer";
import * as auth from "./auth/auth.reducers";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  ui: ui.State,
  user: auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer
}
