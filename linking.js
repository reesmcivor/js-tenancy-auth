export default {
    "Home":"home", 
    "Notes":"notes", 
    "News":"news", 
    "Activate Account" : {
        path: "activate-account/:activationLink?",
            parse: {
                activationLink: (activationLink) => activationLink,
            }
        },
        "Set Password": {
            path: "set-password/:token?", 
            parse: {
            token: (token) => token,
        },
    }
}