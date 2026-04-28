const url = import.meta.env.VITE_API_URL;

if (!url) throw new Error('VITE_API_URL is required');

export const API_BASE_URL: string = url.replace(/\/+$/, '');
