export const useNewContact = () =>
{
    const newContact = async (data) =>{
        return new Promise(async (resolve, reject) => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL+"/users/newContact";
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })

            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            if (!response.ok) {
                // error
                await sleep(1500);
                reject(new Error('Contact failed'));
                return;
            }

            await sleep(2000);
            resolve(true);
        
    })

    }

    return {newContact};
   
    
}