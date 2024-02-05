
export const SubscribeNewsletter = async (email) => {
  const apiUrl = "https://api.brevo.com/v3/contacts";
  const apiKey =
    "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";

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
