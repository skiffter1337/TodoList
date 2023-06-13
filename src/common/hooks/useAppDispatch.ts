import {useDispatch} from "react-redux";
import {AppRootStateType} from "../../app/store/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()