import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'https://api.github.com';
const headers = {
    'Authorization': `${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
};

export async function searchUsersGithub(query, page = 1) {
    const URL = `${BASE_URL}/search/users?q=${query}&page=${page}`;

    try {
        const response = await axios.get(URL, { headers });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function searchRepositoriesGithub(query, page = 1) {
    const URL = `${BASE_URL}/search/repositories?q=${query}&page=${page}`;

    try {
        const response = await axios.get(URL, { headers });
        return response.data;
    } catch (error) {
        console.error('Error searching repositories:', error.response ? error.response.data : error.message);
        throw error;
    }
}