import { useRouter } from "next/navigation";

export const useLogin = () =>
{
    const router = useRouter()

    const login = (data) => {
        return new Promise(async (resolve, reject) => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/users/login";
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            if (!response.ok) {
                // error
                await sleep(1500);
                reject(new Error('Login failed'));
                return;
            }

            const userData = await response.json();

            localStorage.setItem("userId", userData.id);
            localStorage.setItem("token", userData.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("name", userData.name);

            await sleep(2000);
            router.push("/dashboard");
            resolve(true);
        });
    };

    return { login };

   
}