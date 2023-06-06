import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store/store";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector