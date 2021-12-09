import { users, USER_KEY } from "../Constants";

const registeredUsers = users;

const storage = localStorage ?? sessionStorage;

export const logoutUser = () => {
    storage.removeItem(USER_KEY);
}


const saveAuthData = (userId) => {

    const userDataToSave = { userId };

    storage.setItem(USER_KEY, JSON.stringify(userDataToSave));

}

const getAuthData = () => {

    if (storage) {
        const storedUserData = storage.getItem(USER_KEY);
        return (storedUserData) ?
            JSON.parse(storedUserData) : null;

    } return null;

}

const userExists = (email) => {
    for (let singleUser of registeredUsers) {
        if (singleUser.email.toLocaleLowerCase().trim() === email.toLocaleLowerCase().trim()) {
            return singleUser;
        }
    }
    return null;
}

export const isLoggedIn = () => {
    const logedInUser = getAuthData();
    if (logedInUser) {
        return logedInUser;
    } return false;

}

export const getLogedInUserData = () => {
    const logedInUser = isLoggedIn();
    if (logedInUser) {
        return registeredUsers.filter((singleUser) => singleUser.id === logedInUser.userId) ?? null;
    } return null
}

export const loginUser = (email, password) => {

    const user = userExists(email);
    if (user) {
        if (user.password === password) {
            saveAuthData(user.id);
            return true;
        } return false;
    } return false;

}