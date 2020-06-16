import { MessageTypeEnum } from 'app/view/components/_hoc/withFloatMessages/enums';
import { ReactNode } from 'react';

export interface IFloatMessageProps {
    showMessage: (type: MessageTypeEnum, content: ReactNode) => void;
}