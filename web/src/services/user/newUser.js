import { useRouter } from "next/navigation";

export const useNewUser = () =>
{
    const router = useRouter()

    const newUser = async (data) =>{
        return new Promise(async (resolve, reject) => {
            const apiUrl = "/api"+"/users/register";
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json',
                },
            })

            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            if (!response.ok) {
                // error
                await sleep(1500);
                reject(new Error('Register failed'));
                return;
            }

            await sleep(2000);
            router.push("/");
            resolve(true);
        
    })

    }

    return {newUser}
   
    
}