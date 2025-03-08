import Cookies from "js-cookie";

export const fetchDahsboardData = async (userId) => {
    try {
        const dashboardURL = "/api"+"/users/dashboardData/"+Cookies.get('userId');
        const balanceURL = "/api"+"/expenses/balance/"+Cookies.get('userId');    
        const response = await fetch(dashboardURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + Cookies.get('token')
            },
        });
        const balanceResponse = await fetch(balanceURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + Cookies.get('token')
            },
        });
        const balanceData = await balanceResponse.json();
        const dashBoardData = await response.json();
        
        let monthlyProfit = [];
        let montlyDebts = [];

        for (let i = 0; i < 12; i++) {
            monthlyProfit[i] = balanceData.posExpensesByMonth[i+1] || 0;
            montlyDebts[i] = balanceData.negExpensesByMonth[i+1] || 0;
        }

        return {
            ...dashBoardData,
            ...balanceData,
            monthlyProfit,
            montlyDebts,
        }; 
    }
    catch (error) {
        console.error('Error:', error);
        return [];
    }

};