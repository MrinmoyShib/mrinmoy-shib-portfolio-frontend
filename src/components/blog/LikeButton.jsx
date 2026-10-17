import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { apiErrorMessage } from '../../utils/validators';
export default function LikeButton({ post }) {
  const queryClient = useQueryClient();
  const key = ['post', post.slug];
  const mutation = useMutation({ mutationFn: () => api.post(`/posts/${post.slug}/like/`).then(r => r.data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, value => value && ({ ...value, is_liked: !value.is_liked,
        likes_count: Math.max(0, value.likes_count + (value.is_liked ? -1 : 1)) }));
      return { previous };
    },
    onError: (_error, _vars, context) => queryClient.setQueryData(key, context.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
  return <div><button className={`btn btn-outline ${post.is_liked ? 'liked' : ''}`} disabled={mutation.isPending} aria-pressed={post.is_liked}
    onClick={() => mutation.mutate()}><Heart size={18} fill={post.is_liked ? 'currentColor' : 'none'}/> {post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}</button>
    {mutation.isError && <p className="field-error" role="alert">{apiErrorMessage(mutation.error)}</p>}</div>;
}
