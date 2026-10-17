import { useQuery } from '@tanstack/react-query';
import { list } from '../api/endpoints';
export const usePosts = (params = {}) => useQuery({ queryKey: ['posts', params], queryFn: () => list('posts', params) });
