import { API_SERVER_URI } from "./constants"

// Login
export const loginUser = async (
    email,
    password,
    okCallback = () => { },
    notOkCallback = (statusCode) => { },
    errorCallback = (error) => { }
) => {
    try {
        const response = await fetch(`${API_SERVER_URI}/user/login`, {
            method: "POST",
            //   credentials: "include",
            body: JSON.stringify({email: email, password: password})
        });
        const responseJson = await response.json()

        if (response.status === 200) {
            localStorage.setItem("token", responseJson.token)
            okCallback(responseJson);
            console.log(response)
            return;
        }

        notOkCallback(responseJson);

    } catch (error) {
        errorCallback(error);
        console.log(error)
    }
};
