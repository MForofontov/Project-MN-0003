// Import necessary modules and functions
import { callDataProcessingAPI } from './api'; // Import the API call function

// Import necessary types
import { AxiosResponse } from 'axios';

/**
 * Function to upload a file by making a POST request to the file upload endpoint.
 * 
 * @param {File} file - The file to be uploaded.
 * @param {string} title - The title associated with the file.
 * @returns {Promise<AxiosResponse<any>>} - A promise that resolves with the server response when the upload is successful.
 * @throws {Error} - Throws an error if the API call fails.
 */
async function uploadFile(file: File, title: string): Promise<AxiosResponse<any>> {
    // Create a new FormData object
    const formData = new FormData();
    // Append the file to the FormData object
    formData.append('file_path', file);
    formData.append('title', title);

    // Send the request to the server
    const response = await callDataProcessingAPI({
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

// Export the uploadFile function as the default export
export default uploadFile;
