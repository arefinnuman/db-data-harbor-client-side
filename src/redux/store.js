import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer, { setToken } from "./auth/authSlice";
import userReducer from "./user/userSlice";

const isClient = typeof window !== "undefined";
const initialToken = isClient ? localStorage.getItem("token") : null;

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

if (isClient && initialToken) {
  store.dispatch(setToken(initialToken));
}

if (isClient) {
  window.addEventListener("storage", (e) => {
    if (e.key === "token") {
      const newToken = e.newValue;
      store.dispatch(setToken(newToken));
    }
  });
}

export default store;
