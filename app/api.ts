import axios from 'axios';
import { PostLink } from './types/post_link';

const httpClient = axios.create({
    baseURL: process.env.API_BASE_URL
})

export function getAllPostLinks () {
    return httpClient.get<PostLink[]>('/post_links');
}

export function deletePostLink(id: string) {
    return httpClient.delete<PostLink>(`/post_links/${id}`);
}

export function updatePostLink(id: string, data: PostLink) {
    return httpClient.put<PostLink>(`/post_links/${id}`, data);
}

export function createPostLink(data: PostLink) {
    return httpClient.post<PostLink>(`/post_links`, data);
}

export function getPostLink (id: string) {
    return httpClient.get<PostLink>(`/post_links/${id}`);
}