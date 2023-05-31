import {AppRootStateType} from "App/store/store";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn