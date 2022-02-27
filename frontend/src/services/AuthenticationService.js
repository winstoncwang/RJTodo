class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        console.log("authenticated user");
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout() {
        console.log("logout successful");
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user == null) return false;
        return true;
    }
}

export default new AuthenticationService;