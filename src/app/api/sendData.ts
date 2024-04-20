// src/app/api/authService.ts
import axios from 'axios';

import { generateBackendUrl } from '@/app/api/apiUtils';
import Filter from '@/types/filter';

export const createEmptyFilterRoute = async (filter_name: string) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("filter_name in newFilterName blah: " + filter_name);

    const response = await axios.post(generateBackendUrl(`api/create_empty_filter/`), {
        filter_name,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log('response.data in newFilterName: ' + response.data)
    return { "user": response.data.user, "filter": response.data.filter };
};

export const createNewFilterRoute = async (filter: Filter) => {
    Object.keys(filter).forEach((key) => {
        const filterKey = key as keyof Filter;
        console.log(`${filterKey}: ${filter[filterKey]}`);
    });
    const response = await axios.post(generateBackendUrl(`api/update_filter/`), {
        filter,
    });
    return response.data.filter;
}