import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const signup = async (formData) => {
    try {
        const endpoint =
            formData.role === "user"
                ? `${API_BASE_URL}/users/register`
                : formData.role === "employers"
                    ? `${API_BASE_URL}/employers/register`
                    : null;

        if (!endpoint) {
            console.error("Invalid role provided");
            return;
        }

        const response = await axios.post(endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        

        if (response.status === 201) {
            console.log(`${formData.role} signed up successfully`, response.data);
        } else {
            console.error("Error in signup", response.data);
        }
    } catch (error) {
        console.error("Error in signup", error);
    }
};

export { signup };
