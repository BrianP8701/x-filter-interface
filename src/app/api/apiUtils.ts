// src/app/api/apiUtils.ts

export function generateBackendUrl(backendRoute: string): string {
  const backend_url = "http://127.0.0.1:8000";
  return `${backend_url}/${backendRoute}`;
}
