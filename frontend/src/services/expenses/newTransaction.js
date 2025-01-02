export const useNewTransaction = () =>
    {
        const newTransaction = async (data, token) =>{
            return new Promise(async (resolve, reject) => {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL+"/expenses/add";
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
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
    
        return {newTransaction};
       
        
    }