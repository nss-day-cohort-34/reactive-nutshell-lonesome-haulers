import UserManager from "../../modules/UserManager"

export default {
    foundUser () {
        UserManager.getAll().then(users => {
            users.map(user => {
                if (user.username === JSON.parse(sessionStorage.getItem("credentials").username)) {
                    return user
                }
            });
    })
    }
}

