import { MessageTypeEnum } from 'app/view/components/_hoc/withFloatMessages/enums';
import { IFloatMessageProps, IShowMessageProps } from 'app/view/components/_hoc/withFloatMessages/interfaces';
import { showDefaultMessage, showErrorMessage, showInfoMessage, showSuccessMessage, showWarningMessage } from 'app/view/components/_hoc/withFloatMessages/showMessage/Index';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import React, { ReactNode } from 'react';

interface IOwnProps extends IFloatMessageProps, WithSnackbarProps {
}
export function withFloatMessages<P extends IFloatMessageProps>(Component: React.ComponentType<P>):
    React.ComponentType<Omit<P, keyof IFloatMessageProps>> {

    const showMessageOfType = (props: IOwnProps, type: MessageTypeEnum, content: ReactNode) => {
        const msgProps: IShowMessageProps = {
            content,
            ...props
        };

        switch (type) {
            case MessageTypeEnum.Success: {
                showSuccessMessage(msgProps);
                break;
            }

            case MessageTypeEnum.Error: {
                showErrorMessage(msgProps);
                break;
            }

            case MessageTypeEnum.Warning: {
                showWarningMessage(msgProps);
                break;
            }

            case MessageTypeEnum.Info: {
                showInfoMessage(msgProps);
                break;
            }

            default: {
                showDefaultMessage(msgProps);
                break;
            }
        }
    };

    const WithFloatMessages = (props: P & WithSnackbarProps) => {
        const showMessage = (type: MessageTypeEnum, content: ReactNode) => {
            showMessageOfType(props, type, content);
        };

        return (<Component { ...props } showMessage={ showMessage } />);
    };

    return withSnackbar(WithFloatMessages) as any;
}