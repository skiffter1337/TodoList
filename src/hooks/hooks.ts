import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../redux/store/store";
import {AnyAction} from "redux";


type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()