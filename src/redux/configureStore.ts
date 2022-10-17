import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import reducer from "./reducer";

export const ConfigureStore = () => configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
