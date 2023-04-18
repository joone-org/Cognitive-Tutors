import attachCurrentUser from "./attachCurrentUser";
import checkAuth from "./auth";

export default {
    user: {
        isAuth: [checkAuth, attachCurrentUser()],
    }
}