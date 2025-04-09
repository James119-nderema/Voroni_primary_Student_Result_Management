// Fetch timeslot data from API
export const fetchTimeslots = async () => {
  try {
    const response = await fetch("http://localhost:9921/timeslots");
    if (!response.ok) {
      throw new Error(`Error fetching timeslots: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch days data from API
export const fetchDays = async () => {
  try {
    const response = await fetch("http://localhost:9921/days");
    if (!response.ok) {
      throw new Error(`Error fetching days: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};


