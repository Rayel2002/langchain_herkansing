import "dotenv/config";

export async function getJobs(query) {
  const url = `https://indeed-indeed.p.rapidapi.com/apisearch?publisher=%3CREQUIRED%3E&v=2&format=json&callback=%3CREQUIRED%3E&q=${query}&l=austin%2C%20tx&sort=%3CREQUIRED%3E&radius=25&st=%3CREQUIRED%3E&jt=%3CREQUIRED%3E&start=%3CREQUIRED%3E&limit=%3CREQUIRED%3E&fromage=%3CREQUIRED%3E&highlight=%3CREQUIRED%3E&filter=%3CREQUIRED%3E&latlong=%3CREQUIRED%3E&co=%3CREQUIRED%3E&chnl=%3CREQUIRED%3E&userip=%3CREQUIRED%3E&useragent=%3CREQUIRED%3E`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_Key,
      "X-RapidAPI-Host": process.env.API_Host,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
