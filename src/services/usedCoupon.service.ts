export const getUsedCouponsByDate = async (date: string): Promise<number> => {
    try {
      const token = localStorage.getItem('tokenID');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch(`http://localhost:4000/usedCoupons/used-coupons-count?date=${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.status} - ${response.statusText}`;
        console.error(message);
        throw new Error(message);
      }
  
      const data = await response.json();
      console.log("usedCouponCount:", data.usedCouponCount);
      return data.usedCouponCount;
    } catch (err) {
      console.error('Error fetching used coupon count:', err);
      throw err;
    }
  };