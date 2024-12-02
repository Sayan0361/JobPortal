import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const signup = async (formData, userType) => {
    try {
        let form = new FormData();  
        let endpoint = "";

        if (userType === "employer") {
            endpoint = `${API_BASE_URL}/employers/register`;

            form.append("name", formData.fullName);
            form.append("email", formData.email);
            form.append("password", formData.password);
            form.append("company", formData.company);

            console.log("Employer FormData", form);            
        } else if (userType === "jobseeker") {
            endpoint = `${API_BASE_URL}/users/register`;

            form.append("name", formData.fullName);
            form.append("email", formData.email);
            form.append("password", formData.password);

            if (formData.profilePic) {
                form.append("profileImage", formData.profilePic);
            }

            if (formData.resume) {
                form.append("resume", formData.resume);  
            }

            console.log("Resume", formData.resume);            
            console.log("User FormData", form);
        }
        
        const response = await axios.post(endpoint, form, {
            headers: {
                'Content-Type': 'multipart/form-data', // Need to specify this when sending FormData
            },
        });
        console.log("Response", response);
        
    } catch (error) {
        console.error("Error in signup", error);
    }
};

export { signup };
