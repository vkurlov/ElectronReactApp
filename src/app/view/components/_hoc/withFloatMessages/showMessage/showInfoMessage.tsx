import { IShowMessageProps } from 'app/view/components/_hoc/withFloatMessages/interfaces';
import { MessageContentView } from 'app/view/components/_hoc/withFloatMessages/MessageContent/MessageContent';
import React from 'react';

export function showInfoMessage(props: IShowMessageProps) {
    const key = props.enqueueSnackbar((<MessageContentView>{ props.content }</MessageContentView>),
        {
            variant: 'info',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            onClick: () => {
                props.closeSnackbar(key);
            },
            autoHideDuration: 3000
        });
}