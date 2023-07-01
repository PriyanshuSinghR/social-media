import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 'cgcgcgcgcggc',
    content: 'At vero eos et accusamus et iusto odio dignissimos .',
    mediaURL: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'adarshbalika',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'ytytyttyty',
    content: 'At vero eos et accusamus et iusto odio dignissimos .',
    mediaURL: 'https://motionbgs.com/media/945/itachi-uchiha-in-autumn.jpg',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'shubhamsoni',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'oopoppopoo',
    content: 'At vero eos et accusamus et iusto odio dignissimos .',
    mediaURL: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'overlord_wrath',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'rtrtrtrtrt',
    content: 'At vero eos et accusamus et iusto odio dignissimos .',
    mediaURL: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'overlord_wrath',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'xzxzxzxz',
    content: 'At vero eos et accusamus et iusto odio dignissimos .',
    mediaURL: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'sam_song',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'asasasasa',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias .',
    mediaURL: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'priyanshu_singh',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'wqwqwqwq',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis. ',
    mediaURL: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'jatin_smart',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'xhzTkUi2Nt',
    content: 'Nice Weather Today!!',
    mediaURL: '',
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: 'okzxcf',
        comment: 'I agree!! Feels like we should go for outing. What say?',
        firstName: 'Priyanshu',
        lastName: 'Singh',
        username: 'priyanshu_singh',
        image:
          'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: 'drdrdrdrdr',
        comment: 'Nice!',
        firstName: 'Jatin',
        lastName: 'Agarwal',
        username: 'jatin_smart',

        image:
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: 'overlord_wrath',
    createdAt: '2022-01-10T10:55:06+05:30',
    updatedAt: formatDate(),
  },
  {
    _id: 'siFFxfYI1s',
    content: 'Started my Baking journey! Look what I made.',
    mediaURL:
      'https://w0.peakpx.com/wallpaper/146/580/HD-wallpaper-one-piece-shanks-one-piece-thumbnail.jpg',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'adarshbalika',
    createdAt: '2022-05-21T10:55:06+05:30',
    updatedAt: formatDate(),
  },
];
