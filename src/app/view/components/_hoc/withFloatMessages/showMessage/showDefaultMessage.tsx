import { IShowMessageProps } from 'app/view/components/_hoc/withFloatMessages/interfaces';
import { MessageContentView } from 'app/view/components/_hoc/withFloatMessages/MessageContent/MessageContent';
import React from 'react';

export function showDefaultMessage(props: IShowMessageProps) {
    const key = props.enqueueSnackbar((<MessageContentView>{ props.content }</MessageContentView>),
        {
            variant: 'default',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            onClick: () => {
                props.closeSnackbar(key);
            },
            autoHideDuration: 3000
        });

}