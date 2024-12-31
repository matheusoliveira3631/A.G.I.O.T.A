export const fetchExpenses = async () => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL+"/users/expenses/"+localStorage.getItem('userId');
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        return [];
    }
};