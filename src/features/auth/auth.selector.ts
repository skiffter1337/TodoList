import { AppRootStateType } from 'app/store/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;

export const selectCaptchaURL = (state: AppRootStateType) => state.auth.captchaURL;
