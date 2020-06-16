import { Hidden, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CommonButton } from 'app/view/components/buttons/CommonButton';
import { ButtonTypeEnum } from 'app/view/components/buttons/CommonButton/enum';
import { IFieldInfo, IFieldMapping } from 'app/view/components/tables/interfaces';
import React from 'react';

interface IOwnProps {
    /**
     * Содержит название поля с уникальным значением
     */
    keyFieldName: string;

    /**
     * Mapping между полем элемента данных и названием колонки
     */
    fieldMapping: IFieldMapping;

    dataset: {
        [fieldName: string]: any
    }[];
    onEntryEdit?: (entry: object) => void;
    onDatasetRefresh?: () => void;
}

const tableHeaderStyle: React.CSSProperties = {
    fontWeight: 'bold'
};

export class SimpleTable extends React.Component<IOwnProps> {

    public shouldComponentUpdate(nextProps: IOwnProps) {
        const should =
            this.props.dataset !== nextProps.dataset ||
            this.props.fieldMapping !== nextProps.fieldMapping ||
            this.props.keyFieldName !== nextProps.keyFieldName ||
            this.props.onEntryEdit !== nextProps.onEntryEdit;

        return should;
    }

    public render() {
        const dataFields = Object.keys(this.props.fieldMapping);
        const fieldsInfo = Object.values(this.props.fieldMapping);
        const dataRows = this.props.dataset;
        const keyFieldName = this.props.keyFieldName;

        return (
            <>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {
                                fieldsInfo.map((fieldInfo) => (
                                    this.createTableHeaderCell(fieldInfo.fieldWidth, fieldInfo)
                                ))
                            }
                            {
                                this.createTableHeaderRefreshCell()
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { dataRows.map((row) => (
                            <TableRow key={ row[keyFieldName] }>
                                {
                                    dataFields.map((dataField, cellIndex) => (
                                        this.createTableBodyCell((row[keyFieldName] + (row[dataField] ?? '') + cellIndex), row[dataField], fieldsInfo[cellIndex])
                                    ))
                                }
                                {
                                    this.props.onEntryEdit
                                        ? this.createTableBodyCellEditButton(row)
                                        : null
                                }
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </>
        );
    }

    private createTableHeaderCell(headerWidth: string, field: IFieldInfo) {
        return (
            <Hidden key={ field.caption }
                lgDown={ field.hiddenWhenLgDown } lgUp={ field.hiddenWhenLgUp }
                mdDown={ field.hiddenWhenMdDown } mdUp={ field.hiddenWhenMdUp }
                smDown={ field.hiddenWhenSmDown } smUp={ field.hiddenWhenSmUp }
                xlDown={ field.hiddenWhenXlDown } xlUp={ field.hiddenWhenXlUp }
                xsDown={ field.hiddenWhenXsDown } xsUp={ field.hiddenWhenXsUp }
                only={ field.hiddenOnlyFor } >
                <TableCell align="left" style={ { ...tableHeaderStyle, width: headerWidth } }>{ field.caption }</TableCell>
            </Hidden>
        );
    }

    private createTableHeaderRefreshCell() {

        const refreshAction = this.props.onDatasetRefresh
            ? () => this.props.onDatasetRefresh!()
            : undefined;

        return (<TableCell align="right" style={ { ...tableHeaderStyle, width: '1px' } }>
            <IconButton title="Обновить" size="small" onClick={ refreshAction }>
                <RefreshIcon color="primary" />
            </IconButton>
        </TableCell>);
    }

    private createTableBodyCell(key: string | any, content: object, field: IFieldInfo) {
        return (
            <Hidden key={ key }
                lgDown={ field.hiddenWhenLgDown } lgUp={ field.hiddenWhenLgUp }
                mdDown={ field.hiddenWhenMdDown } mdUp={ field.hiddenWhenMdUp }
                smDown={ field.hiddenWhenSmDown } smUp={ field.hiddenWhenSmUp }
                xlDown={ field.hiddenWhenXlDown } xlUp={ field.hiddenWhenXlUp }
                xsDown={ field.hiddenWhenXsDown } xsUp={ field.hiddenWhenXsUp }
                only={ field.hiddenOnlyFor }>
                <TableCell align="left" style={ {
                    wordBreak: 'break-word'
                } }>{ content }
                </TableCell>
            </Hidden>
        );
    }
    private createTableBodyCellEditButton(row: { [fieldName: string]: object }) {
        const editAction = () => this.editEntry(row);

        return (
            <TableCell align="right">
                <CommonButton type={ ButtonTypeEnum.Success } onClick={ editAction } isEnabled={ true }>
                    Редактировать
                </CommonButton>
            </TableCell>
        );
    }
    public editEntry(row: { [fieldName: string]: object }) {
        if (this.props.onEntryEdit) {
            this.props.onEntryEdit(row);
        }
    }

}


