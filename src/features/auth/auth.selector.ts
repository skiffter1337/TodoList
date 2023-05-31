import {AppRootStateType} from "redux/store/store";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn