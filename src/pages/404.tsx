import * as React from 'react';
import ErrorPage from './ErrorPage';

export const Page404: React.FC = (() => <ErrorPage description="Sorry. There is no such URL." backUrl="/" />);
export default Page404;