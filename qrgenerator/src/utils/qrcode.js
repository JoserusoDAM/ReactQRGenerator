import { API_SERVER_URI } from "./constants"

export const getAllQRUrl = async (
    okCallback = () => { },
    notOkCallback = (statusCode) => { },
    errorCallback = (error) => { }
) => {
    try {
       const response = await fetch(`${API_SERVER_URI}/getAllQRUrl`, {
            method: "GET",
            // credentials: "include",
            //  headers: headers
        })

    if (response.ok) {
        okCallback(await response.json())
        return;
    }
       
    notOkCallback(response.status)  

    } catch (error) {
        errorCallback(error);
        console.log("Error: " + error)
    }
};

export const insertQRUrl = async (
    data,
    okCallback = () => { },
    notOkCallback = (statusCode) => { },
    errorCallback = (error) => { }
) => {
    try {
        const response = await fetch(`${API_SERVER_URI}/insertQRUrl`, {
            method: "POST",
            //   credentials: "include",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            okCallback(await response.json());
            console.log(response)
            return;
        }

        notOkCallback(await response.json());

    } catch (error) {
        errorCallback(error);
        console.log(error)
    }
};

export const deleteQRUrl = async (
    id,
    okCallback = () => { },
    notOkCallback = (statusCode) => { },
    errorCallback = (error) => { }
) => {
    try {
        const response = await fetch(`${API_SERVER_URI}/deleteQRURL/${id}`, {
            method: "DELETE",
            //  credentials: "include",
        });

        if (response.ok) {
            okCallback(await response.json());
            console.log(response)
            return;
        }

        notOkCallback(await response.json());

    } catch (error) {
        errorCallback(error);
        console.log(error)
    }
};