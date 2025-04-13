import { config } from '../config/config';

export default async function apiHandler(method, body, url) {
  const response = await fetch(`${config.baseUrl}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return { data, response };
}
