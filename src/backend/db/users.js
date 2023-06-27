import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
import image from '../../assets/profile.jpeg';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 'zxcvb',
    firstName: 'Overlord',
    lastName: 'Wrath',
    username: 'overlord_wrath',
    password: 'smash',
    bio: 'Be always Positive',
    website: 'https://github.com/priyanshuSinghR',
    image,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'asdfg',
    firstName: 'Adarsh',
    lastName: 'Balika',
    username: 'adarshbalika',
    password: '12345',
    bio: 'Wake Up To Reality',
    website: 'https://github.com/priyanshuSinghR',
    image:
      'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'qwert',
    firstName: 'Shubham',
    lastName: 'Soni',
    username: 'shubhamsoni',
    password: 'qwert',
    bio: 'Being in Present',
    website: 'https://github.com/priyanshuSinghR',
    image:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: '123',
    firstName: 'Sam',
    lastName: 'Song',
    username: 'sam_song',
    password: 'smash',
    bio: 'If you care then fight for it',
    website: 'https://github.com/priyanshuSinghR',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: '12345',
    firstName: 'Priyanshu',
    lastName: 'Singh',
    username: 'priyanshu_singh',
    password: '12345',
    bio: 'Mountain is Love',
    website: 'https://github.com/priyanshuSinghR',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: '1234',
    firstName: 'Jatin',
    lastName: 'Agarwal',
    username: 'jatin_smart',
    password: 'smash',
    bio: 'Always take care your Family',
    website: 'https://github.com/priyanshuSinghR',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
