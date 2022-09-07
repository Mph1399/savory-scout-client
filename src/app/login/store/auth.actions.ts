import { createAction, props } from "@ngrx/store";
import  firebase from "firebase/compat/app"

export const AUTHENTICATE_SUCCESS = createAction(
    '[Auth] Authentication Success', props<{email: string | null, uid: string | null, token: string | null}>()
    )
 export const AUTHENTICATE_RESET = createAction(
        '[Auth] Authentication Resets', props<{email: string | null, uid: string | null, token: string | null}>()
 )

 export const AUTO_LOGIN = createAction(
            '[Auth] Auto Login', props<{ user: any }>()
)
    
export const AUTH_VERIFICATION = createAction(
        '[Auth] Auth Verification'
        )

export const LOGOUT = createAction('[Auth] Logout')

