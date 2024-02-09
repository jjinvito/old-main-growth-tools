
export const SubscribeNewsletter = async (email) => {
  const apiUrl = "https://api.brevo.com/v3/contacts";
  const apiKey = process.env.BREVO_API_KEY;

  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey,
  };

  const body = { email: email };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return "success";
    } else {
      console.error(`POST request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
    return "Something went wrong! :(";
  }
};
