export type CourseSeed = {
  _id: string
  title: string
  description: string
  price: number
  thumbnailUrl: string
  createdAt: Date
  updatedAt: Date
}

export type LectureSeed = {
  _id: string
  courseId: string
  title: string
  description: string
  videoUrl: string
  createdAt: Date
  updatedAt: Date
}

export const courseSeeds: CourseSeed[] = [
  {
    _id: '66f0a1b2c3d4e5f60718293a',
    title: 'MERN Full-Stack Development',
    description:
      'Build production-ready web applications with MongoDB, Express, React, and Node.js.',
    price: 12000,
    thumbnailUrl: 'https://picsum.photos/seed/mern/800/450',
    createdAt: new Date('2026-01-10T09:00:00.000Z'),
    updatedAt: new Date('2026-01-10T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718293b',
    title: 'React & TypeScript Essentials',
    description:
      'Master components, hooks, routing, and type-safe React development.',
    price: 8000,
    thumbnailUrl: 'https://picsum.photos/seed/react-ts/800/450',
    createdAt: new Date('2026-01-11T09:00:00.000Z'),
    updatedAt: new Date('2026-01-11T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718293c',
    title: 'Node.js & Express API Development',
    description:
      'Design REST APIs with Express, middleware, validation, and authentication.',
    price: 9000,
    thumbnailUrl: 'https://picsum.photos/seed/node-express/800/450',
    createdAt: new Date('2026-01-12T09:00:00.000Z'),
    updatedAt: new Date('2026-01-12T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718293d',
    title: 'MongoDB for Developers',
    description:
      'Model data, write queries, and connect MongoDB to Node.js applications.',
    price: 7000,
    thumbnailUrl: 'https://picsum.photos/seed/mongodb/800/450',
    createdAt: new Date('2026-01-13T09:00:00.000Z'),
    updatedAt: new Date('2026-01-13T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718293e',
    title: 'Tailwind CSS UI Design',
    description:
      'Create responsive, modern interfaces quickly with utility-first CSS.',
    price: 5000,
    thumbnailUrl: 'https://picsum.photos/seed/tailwind/800/450',
    createdAt: new Date('2026-01-14T09:00:00.000Z'),
    updatedAt: new Date('2026-01-14T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718293f',
    title: 'Git, GitHub & Deployment',
    description:
      'Version control, collaboration workflows, and deploying apps to the cloud.',
    price: 4000,
    thumbnailUrl: 'https://picsum.photos/seed/git-deploy/800/450',
    createdAt: new Date('2026-01-15T09:00:00.000Z'),
    updatedAt: new Date('2026-01-15T09:00:00.000Z'),
  },
]

export const lectureSeeds: LectureSeed[] = [
  {
    _id: '66f0a1b2c3d4e5f607182940',
    courseId: '66f0a1b2c3d4e5f60718293a',
    title: 'Course Overview & Project Setup',
    description:
      'What you will build and how to set up the MERN project structure.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-10T09:00:00.000Z'),
    updatedAt: new Date('2026-01-10T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182941',
    courseId: '66f0a1b2c3d4e5f60718293a',
    title: 'Building the Express API',
    description:
      'Create the backend routes, controllers, and models for the project.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-10T09:30:00.000Z'),
    updatedAt: new Date('2026-01-10T09:30:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182942',
    courseId: '66f0a1b2c3d4e5f60718293b',
    title: 'React Components & Props',
    description: 'Understand component composition and typed props in React.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-11T09:00:00.000Z'),
    updatedAt: new Date('2026-01-11T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182943',
    courseId: '66f0a1b2c3d4e5f60718293b',
    title: 'Hooks & State Management',
    description: 'Use useState, useEffect, and custom hooks effectively.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-11T09:30:00.000Z'),
    updatedAt: new Date('2026-01-11T09:30:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182944',
    courseId: '66f0a1b2c3d4e5f60718293c',
    title: 'Express Routing & Middleware',
    description: 'Structure routes and build reusable middleware for your API.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-12T09:00:00.000Z'),
    updatedAt: new Date('2026-01-12T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182945',
    courseId: '66f0a1b2c3d4e5f60718293c',
    title: 'Input Validation & Error Handling',
    description: 'Validate requests and return consistent API error responses.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-12T09:30:00.000Z'),
    updatedAt: new Date('2026-01-12T09:30:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182946',
    courseId: '66f0a1b2c3d4e5f60718293d',
    title: 'MongoDB Data Modeling',
    description: 'Design collections and schemas that fit your application.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-13T09:00:00.000Z'),
    updatedAt: new Date('2026-01-13T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182947',
    courseId: '66f0a1b2c3d4e5f60718293d',
    title: 'Querying with Mongoose',
    description: 'Create, read, update, and delete documents with Mongoose models.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-13T09:30:00.000Z'),
    updatedAt: new Date('2026-01-13T09:30:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182948',
    courseId: '66f0a1b2c3d4e5f60718293e',
    title: 'Tailwind Utility Fundamentals',
    description:
      'Learn spacing, typography, color, and layout utilities in Tailwind.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-14T09:00:00.000Z'),
    updatedAt: new Date('2026-01-14T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f607182949',
    courseId: '66f0a1b2c3d4e5f60718293e',
    title: 'Responsive Layout Patterns',
    description: 'Build mobile-first layouts with responsive breakpoints.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-14T09:30:00.000Z'),
    updatedAt: new Date('2026-01-14T09:30:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718294a',
    courseId: '66f0a1b2c3d4e5f60718293f',
    title: 'Git Branching & Pull Requests',
    description: 'Work with branches, commits, and collaborative pull requests.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-15T09:00:00.000Z'),
    updatedAt: new Date('2026-01-15T09:00:00.000Z'),
  },
  {
    _id: '66f0a1b2c3d4e5f60718294b',
    courseId: '66f0a1b2c3d4e5f60718293f',
    title: 'Deploying to Vercel',
    description:
      'Connect a repository and deploy the frontend and backend to Vercel.',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    createdAt: new Date('2026-01-15T09:30:00.000Z'),
    updatedAt: new Date('2026-01-15T09:30:00.000Z'),
  },
]
