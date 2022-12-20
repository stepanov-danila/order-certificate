import { configureStore } from "@reduxjs/toolkit";
import orderCertificateSlice from "./slice";

/* const apiMiddleWare = (store) => (next) => (action) => {
  setUpInterceptors(store);
  return next(action);
}; */

export const store = configureStore({
  reducer: {
    orderCertificate: orderCertificateSlice,
  },
  /* middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleWare), */
});
