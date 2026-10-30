export interface ContactPayload {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api-pacome-sodazindji-a4dsedfrfncaf3dq.belgiumcentral-01.azurewebsites.net";

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contact API responded with ${response.status}`);
  }
}
