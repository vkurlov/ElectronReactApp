import { MessageContentView } from 'app/view/components/_hoc/withFloatMessages/MessageContent/MessageContent';
import React, { ReactNode } from 'react';

interface IOwnProps {
    children?: ReactNode;
}

export class MessageContent extends React.Component<IOwnProps> {
    public shouldComponentUpdate(nextProps: IOwnProps) {
        return nextProps.children !== this.props.children;
    }
    public render() {
        return (
            <MessageContentView>
                { this.props.children }
            </MessageContentView>
        );
    }
}
