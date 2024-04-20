// src/app/api/authService.ts
import axios from 'axios';

import { generateBackendUrl } from '@/app/api/apiUtils';


export const getFilterRoute = async (filter_id: string) => {
  console.log("filter_id in getFilterRoute: " + filter_id);
  const response = await axios.get(generateBackendUrl(`api/get_filter/${filter_id}`));
  return response.data.filter;
};