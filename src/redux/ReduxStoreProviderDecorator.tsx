import React from "react";
import {Provider} from "react-redux";
import {store} from "../app/store/store";


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={store}>{storyFn()}</Provider>