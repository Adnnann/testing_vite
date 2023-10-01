
import { config } from "./config";
import axios from "axios";

async function signUp(user) {
    const response =  await axios.post(config.API_URL + "user/signup", {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
       
    });

    return await response.json();

}