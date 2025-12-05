import type {IWish} from "@/interfaces/wish-interface.ts";

type status = 'idle' | 'loading' | 'error' | 'success';

export interface IWishState {
    wishes: IWish[],
    currentWish: IWish

    currentStatus: status,
    currentWishError: string | null,

    listStatus: status,
    listError: string | null,

    createStatus: status,
    createError: string | null,

    updateStatus: status,
    updateError: string | null ,

    deleteStatus: status,
    deleteError: string | null,
}


export type WishAction =
    { type: "GET_WISH_SUCCESS", payload: IWish } |
    { type: "GET_WISH_ERROR", payload: string } |
    { type: "GET_WISH_LOADING" } |
    { type: "GET_WISHES_ERROR", payload: string } |
    { type: "GET_WISHES_SUCCESS", payload: IWish[] } |
    { type: "GET_WISHES_LOADING" } |
    { type: "CREATE_WISH_ERROR", payload: string } |
    { type: "CREATE_WISH_SUCCESS", payload: IWish } |
    { type: "CREATE_WISH_LOADING" } |
    { type: "UPDATE_WISH_SUCCESS", payload: IWish } |
    { type: "UPDATE_WISH_LOADING" } |
    { type: "DELETE_WISH_ERROR", payload: string } |
    { type: "DELETE_WISH_LOADING" } |
    { type: "DELETE_WISH_SUCCESS", payload: number }


export const initialWishState: IWishState = {
    wishes: [],
    currentWish: {} as IWish,
    currentStatus: 'idle',
    currentWishError: null,
    listStatus: 'idle',
    listError: null,
    createStatus: 'idle',
    createError: null,
    updateStatus: 'idle',
    updateError: null,
    deleteStatus: 'idle',
    deleteError: null,
}

export const wishesReducer = (state: IWishState, action: WishAction): IWishState => {
    switch (action.type) {

        case "GET_WISH_LOADING":
            return {
                ...state,
                currentStatus: 'loading',
                currentWishError: null,
            };
        case "GET_WISH_ERROR":
            return {
                ...state,
                currentStatus: 'error',
                currentWishError: action.payload,
            };
        case "GET_WISH_SUCCESS":
            return {
                ...state,
                currentWish: action.payload,
                currentStatus: 'success',
                currentWishError: null,
            };

        case "GET_WISHES_LOADING":
            return {
                ...state,
                listStatus: 'loading',
                listError: null,
            };
        case "GET_WISHES_ERROR":
            return {
                ...state,
                listStatus: 'error',
                listError: action.payload,
            };
        case "GET_WISHES_SUCCESS":
            return {
                ...state,
                wishes: action.payload,
                listStatus: 'success',
                listError: null,
            };

        case "CREATE_WISH_SUCCESS":
            return {
                ...state,
                wishes: [action.payload, ...state.wishes],
                createStatus: 'success',
                createError: null,
            };
        case "CREATE_WISH_LOADING":
            return {
                ...state,
                createStatus: 'loading',
                createError: null,
            };
        case "CREATE_WISH_ERROR":
            return {
                ...state,
                createStatus: 'error',
                createError: action.payload,
            };


        case "UPDATE_WISH_LOADING":
            return {
                ...state,
                updateStatus: 'loading',
                updateError: null,
            };

        case "UPDATE_WISH_SUCCESS":
            return {
                ...state,
                wishes: state.wishes.map(wish => wish.id === action.payload.id ? action.payload : wish),
                updateStatus: 'success',
                updateError: null,
            }

        case "DELETE_WISH_SUCCESS":
            return {
                ...state,
                wishes: state.wishes.filter(wish => wish.id !== action.payload),
                deleteStatus: 'success',
                deleteError: null,
            };
        case "DELETE_WISH_LOADING":
            return {
                ...state,
                deleteStatus: 'loading',
                deleteError: null,
            };
        case "DELETE_WISH_ERROR":
            return {
                ...state,
                deleteStatus: 'error',
                deleteError: action.payload,
            };

        default:
            return state;
    }
}
