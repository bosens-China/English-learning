import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Stash = lazy(() => import('@/pages/Stash'));
const Series = lazy(() => import('@/pages/Series'));
const Course = lazy(() => import('@/pages/Course'));
const Textbook = lazy(() => import('@/pages/Textbook'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Stash></Stash>,
  },
  {
    path: '/Series',
    element: <Series></Series>,
  },
  {
    path: '/Course',
    element: <Course></Course>,
  },
  {
    path: '/Textbook',
    element: <Textbook></Textbook>,
  },
]);

export const Routes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
