import { callAPI } from './api';
import { AxiosResponse } from 'axios';

/**
 * Uploads a file to the server.
 * @param file - The file to be uploaded.
 * @returns A promise that resolves to the response from the server.
 */
async function uploadFile(file: File, title: string): Promise<AxiosResponse<any>> {
    // Create a new FormData object
    const formData = new FormData();
    // Append the file to the FormData object
    formData.append('file_path', file);
    formData.append('title', title);

    // Send the request to the server
    const response = await callAPI({
        method: 'POST',
        url: '/file-upload/',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Check if the response is successful
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    // Return the response
    return response;
}

export default uploadFile;