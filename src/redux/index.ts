import { combineReducers, configureStore } from '@reduxjs/toolkit'
import general from './general.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['general']
}

const rootReducer = combineReducers({
    general: general
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store)

export default { store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch