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

            //return response;
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

const login = async (formData, userType) =>{
    try {
        let endpoint = "";
        let form = new FormData();

        console.log("FormData", formData);        

        if(userType === "employer"){
            endpoint = `${API_BASE_URL}/employers/login`
            
            form.append("email", formData.email);
            form.append("password", formData.password);

            console.log("Employer FormData", form);

        }else if(userType === "user"){
            endpoint = `${API_BASE_URL}/users/login`

            form.append("email", formData.email);
            form.append("password", formData.password);
        }

        const response = await axios.post(endpoint, form,{
            withCredentials: true,
        })
        console.log("Response", response);
        return response;
    } catch (error) {
        console.log("Error in login", error);        
    }
}

const logout = async (userType) => {
    try {
        if (!userType || (userType !== "employer" && userType !== "user")) {
            throw new Error("Invalid userType provided");
        }

        const endpoint =
            userType === "employer"
                ? `${API_BASE_URL}/employers/logout`
                : `${API_BASE_URL}/users/logout`;

        const response = await axios.post(endpoint, {}, { withCredentials: true });

        if (response.status === 200) {
            console.log("Logged out successfully:", response.data);
        } else {
            console.warn("Unexpected response status:", response.status);
        }
    } catch (error) {
        console.error("Error in logout:", error.response?.data || error.message);
    }
};

const getJobs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/`);
        console.log("Response", response);
        return response.data.data;
    } catch (error) {
        console.log("Error in getJobs", error);        
    }
}

const postJob = async (formData) => {
    try {
        let form = new FormData();  

        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("location", formData.location);
        form.append("company", formData.company);
        form.append("salary", formData.salary);

        const response = await axios.post(`${API_BASE_URL}/jobs/postJobs`, form, {
            headers: {
                'Content-Type': 'multipart/form-data', // Need to specify this when sending FormData
            },
        });
        console.log("Response", response);
        
    } catch (error) {
        console.error("Error in postJob", error);
    }
}

export {signup, login, logout, getJobs, postJob};
