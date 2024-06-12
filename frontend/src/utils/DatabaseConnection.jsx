export default async function DatabaseConnection(message) {
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
  
      const data = await response.json(); // Assuming the response is JSON
      console.log("Data fetched successfully:", data);
      return data; // Return the response data
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  }
  