
import { AppReduxStoreState } from 'app/redux/interfaces';
import { NavLeftSideBarMenuActions } from 'app/redux/reducers/navBarMenu/actions';
import { NavBarMenuSideEnum } from 'app/redux/reducers/navBarMenu/enums';
import { INavBarMenuChangeMenuStateDataModel } from 'app/redux/reducers/navBarMenu/partial/changeMenuState/interfaces/dataModels';
import { IChangeMenuStateActionFailedPayload, IChangeMenuStateActionStartPayload, IChangeMenuStateActionSuccessPayload } from 'app/redux/reducers/navBarMenu/partial/changeMenuState/interfaces/reducerTypes';
import { BaseReduxThunkObject } from 'core/redux/BaseReduxThunkObject';
import { IThunkStartActionArguments, IThunkStartActionArgumentsResult, IThunkStartExecutionArguments } from 'core/redux/BaseReduxThunkObject/interfaces';
import Cookies from 'js-cookie';

//#region custom user types

type TActionStartPayload = IChangeMenuStateActionStartPayload;
type TActionSuccessPayload = IChangeMenuStateActionSuccessPayload;
type TActionFailedPayload = IChangeMenuStateActionFailedPayload;
type TInputDataModel = INavBarMenuChangeMenuStateDataModel;

const { changeMenuState: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = NavLeftSideBarMenuActions;

//#endregion


//#region Fixed types

type TThunkStartActionArguments = IThunkStartActionArguments<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel>;
type TThunkStartActionArgumentsResult = IThunkStartActionArgumentsResult<
    TActionStartPayload,
    TActionFailedPayload>;

type TThunkStartExecutionArguments = IThunkStartExecutionArguments<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel>;

//#endregion
/**
 * Thunk для изменения сотояния NavBarMenu
 */
export class NavBarMenuChangeMenuStateThunk extends BaseReduxThunkObject<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel> {

    public static invoke(args: TInputDataModel) {
        return new NavBarMenuChangeMenuStateThunk().execute(args);
    }

    protected get startActionValue(): string { return START_ACTION; }
    protected get successActionValue(): string { return SUCCESS_ACTION; }
    protected get failedActionValue(): string { return FAILED_ACTION; }
    protected getStartActionArguments(args: TThunkStartActionArguments): TThunkStartActionArgumentsResult {
        const state = args.getStore().navBarMenuState;
        const canExecute =
            !!args.inputArgs &&
            args.inputArgs.menuSide === NavBarMenuSideEnum.LeftSide &&
            state.menu.leftSideMenu.filter(item => item.startMenu.key === args.inputArgs!.menuKey).length > 0;

        return {
            condition: canExecute,
            getReducerStateFunc: () => args.getStore().navBarMenuState,
        };
    }

    private setCookieIsExpanded(menuCategory: string, isExpanded: boolean) {
        Cookies.set(menuCategory, isExpanded ? 'true' : 'false');
    }

    protected async startExecution(args: TThunkStartExecutionArguments): Promise<void> {
        const state = args.getStore().navBarMenuState;
        const found = state.menu.leftSideMenu.filter(item => item.startMenu.key === args.inputArgs!.menuKey)[0];
        this.setCookieIsExpanded(found.categoryKey, args.inputArgs!.isExpanded!);

        args.success({
            menuKey: args.inputArgs!.menuKey,
            isActive: args.inputArgs!.isActive,
            isExpanded: args.inputArgs!.isExpanded
        });
    }
}