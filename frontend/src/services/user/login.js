import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogin = () => {
    const router = useRouter();

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

            Cookies.set("userId", userData.id);
            Cookies.set("token", userData.token);
            Cookies.set("email", data.email);
            Cookies.set("name", userData.name);

            await sleep(2000);
            router.push("/dashboard");
            resolve(true);
        });
    };

    return { login };
};