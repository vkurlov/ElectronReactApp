import React from 'react';
import { PageHeaderView } from './PageHeaderView';

interface IOwnProps {
    page: React.ComponentType;
    title: string;
}

export const withHeader = ({ page: Component, title }: IOwnProps) => {
    return class WithTitle extends React.Component {
        public render() {
            return (
                <>
                    <PageHeaderView title={ title } />
                    <Component { ...this.props } />
                </>
            );
        }
    };
};