export const getSortedProducts = (post, sortBy) => {
  if (sortBy === 'LATEST')
    return [...post].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  if (sortBy === 'OLDEST')
    return [...post].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  if (sortBy === 'TRENDING')
    return [...post].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  return post;
};

export const getSearchedUser = (users, searchText) => {
  return users?.filter((item) =>
    item?.firstName?.toLowerCase().includes(searchText.toLowerCase()),
  );
};

export const textChanger = (text) =>
  text
    ?.split('')
    ?.map((t) => (t === '\n' ? '</br>' : t))
    .join('');

export const emojis = [
  '🙂',
  '😊',
  '🤗',
  '😄',
  '😅',
  '😆',
  '😂',
  '🤣',
  '😘',
  '🥰',
  '😍',
  '🤩',
  '😇',
  '😎',
  '😋',
  '😜',
  '🙃',
  '😴',
  '🤯',
  '🥳',
];
