export const getUserSubscriptionsByDate = async (date: string): Promise<number> => {
    try {
      const response = await fetch(`http://localhost:4000/userSubscriptions/user-subscriptions-count?date=${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('tokenID')}`,
        },
      });
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.status} - ${response.statusText}`;
        console.error(message);
        throw new Error(message);
      }
  
      const data = await response.json();
      console.log("subscriptionCount:", data.subscriptionCount);
      return data.subscriptionCount;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching subscription count:', err);
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };