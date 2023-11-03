type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

async function fetcher<T>(url: string, options?: RequestOptions): Promise<T> {
  const URL = `${process.env.BACKEND_ENDPOINT}${url}`;

  const defaultHeaders = {
    Authorization: `Bearer ${process.env.BACKEND_PUBLIC_TOKEN}`,
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const requestOptions: RequestOptions = {
    method: options?.method || "GET",
    headers: defaultHeaders,
    body: options?.body,
  };

  try {
    const response = await fetch(URL, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: T = await response.json();
    return responseData;
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
}

export default fetcher;
