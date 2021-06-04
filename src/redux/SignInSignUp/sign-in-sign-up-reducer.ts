interface SignInAction {
    type: string,
    payload: {
        role: string,
        token: string,
        tokenType: string,
        signedIn: boolean
    }
}

const INITIAL_STATE = {
    role: "",
    token: "",
    tokenType: "",
    signedIn: false
}

export const signInReducer = (state = INITIAL_STATE, action: SignInAction) => {
    switch (action.type) {
        case "SignIn":
            return {
                ...state,
                role: action.payload.role,
                token: action.payload.token,
                tokenType: action.payload.tokenType,
                signedIn: action.payload.signedIn
            }
        default:
            return state;

    }
}