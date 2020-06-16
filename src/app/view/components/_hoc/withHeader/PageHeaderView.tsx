import React from 'react';
import { Helmet } from 'react-helmet';

interface IOwnProps {
    title: string;
}

export const PageHeaderView = ({ title }: IOwnProps) => {
    const defaultTitle = '⚛️ app';
    return (
        <Helmet>
            <title>{ title ? title : defaultTitle }</title>
        </Helmet>
    );
};