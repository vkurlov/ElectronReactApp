import { AppIocContainer } from 'app/AppIocContainer';
import { AppReduxStoreState } from 'app/redux/interfaces';
import { NavLeftSideBarMenuActions } from 'app/redux/reducers/navBarMenu/actions';
import { INavBarMenuReceiveAllDataModel } from 'app/redux/reducers/navBarMenu/partial/receiveAll/interfaces/dataModels';
import { IReceiveAllActionFailedPayload, IReceiveAllActionStartPayload, IReceiveAllActionSuccessPayload } from 'app/redux/reducers/navBarMenu/partial/receiveAll/interfaces/reducerTypes';
import { IReceiveMenuItemDataModel } from 'app/web/HttpProxy/NavMenuProxy/responses/IReceiveMenuResponseDataModel';
import { BaseReduxThunkObject } from 'core/redux/BaseReduxThunkObject';
import { IThunkStartActionArguments, IThunkStartActionArgumentsResult, IThunkStartExecutionArguments } from 'core/redux/BaseReduxThunkObject/interfaces';
import { RequestKindEnum } from 'core/requestSender/enums';
import Cookies from 'js-cookie';
//#region custom user types

type TActionStartPayload = IReceiveAllActionStartPayload;
type TActionSuccessPayload = IReceiveAllActionSuccessPayload;
type TActionFailedPayload = IReceiveAllActionFailedPayload;
type TInputDataModel = INavBarMenuReceiveAllDataModel;

const { receiveAll: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = NavLeftSideBarMenuActions;

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
 * Thunk для загрузки NavBarMenu
 */
export class NavBarMenuReceiveAllThunk extends BaseReduxThunkObject<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel> {

    public static invoke(args: TInputDataModel) {
        return new NavBarMenuReceiveAllThunk().execute(args);
    }

    protected get startActionValue(): string { return START_ACTION; }
    protected get successActionValue(): string { return SUCCESS_ACTION; }
    protected get failedActionValue(): string { return FAILED_ACTION; }
    protected getStartActionArguments(args: TThunkStartActionArguments): TThunkStartActionArgumentsResult {
        const cloudServicesState = args.getStore().navBarMenuState;
        return {
            condition: !cloudServicesState.hasSuccessFor.menuReceived || args.inputArgs?.force === true,
            getReducerStateFunc: () => args.getStore().cloudServicesState,
        };
    }

    private checkIsActive(url: string): boolean {
        return window.location.pathname === url;
    }

    private checkIsExpanded(menuCategory: string, subMenu: IReceiveMenuItemDataModel[]): boolean {
        const isExpanded = !!menuCategory && Cookies.get(menuCategory) === 'true';
        if (isExpanded) {
            return true;
        }
        if (subMenu && subMenu.length) {
            const found = subMenu.filter(item => {
                return this.checkIsActive(item.Href);
            });
            if (found.length) {
                return true;
            }
        }
        return false;
    }


    protected async startExecution(args: TThunkStartExecutionArguments): Promise<void> {
        const httpProxy = AppIocContainer.getHttpProxy();

        try {
            const menu = await httpProxy.getNavMenuProxy().receiveNavMenu(RequestKindEnum.SEND_AUTOMATICALLY);
            const leftMenu = menu.LeftSideMenu.map(item => {
                return {
                    categoryKey: item.CategoryKey,
                    startMenu: {
                        key: item.StartMenu.Caption,
                        faIcon: item.StartMenu.FaIcon,
                        caption: item.StartMenu.Caption,
                        href: item.StartMenu.Href,
                        isExpanded: this.checkIsExpanded(item.CategoryKey, item.Children),
                        isActive: false
                    },
                    children: item.Children.map(item2 => {
                        return {
                            key: item2.Caption,
                            faIcon: item2.FaIcon,
                            caption: item2.Caption,
                            href: item2.Href,
                            isExpanded: false,
                            isActive: this.checkIsActive(item2.Href)
                        };
                    })
                };
            });

            const topMenuBalance =
                !menu.TopSideMenu.BalanceMenu
                    ? null
                    : {
                        categoryKey: menu.TopSideMenu.BalanceMenu.CategoryKey,
                        startMenu: {
                            key: menu.TopSideMenu.BalanceMenu.StartMenu.Caption,
                            faIcon: menu.TopSideMenu.BalanceMenu.StartMenu.FaIcon,
                            caption: menu.TopSideMenu.BalanceMenu.StartMenu.Caption,
                            href: menu.TopSideMenu.BalanceMenu.StartMenu.Href,
                            isExpanded: false,
                            isActive: false
                        },
                        children: menu.TopSideMenu.BalanceMenu.Children.map(item2 => {
                            return {
                                key: item2.Caption,
                                faIcon: item2.FaIcon,
                                caption: item2.Caption,
                                href: item2.Href,
                                isExpanded: false,
                                isActive: false
                            };
                        })
                    };

            const topMenuGreetings =
                !menu.TopSideMenu.GreetingsMenu
                    ? null
                    : {
                        categoryKey: menu.TopSideMenu.GreetingsMenu.CategoryKey,
                        startMenu: {
                            key: menu.TopSideMenu.GreetingsMenu.StartMenu.Caption,
                            faIcon: menu.TopSideMenu.GreetingsMenu.StartMenu.FaIcon,
                            caption: menu.TopSideMenu.GreetingsMenu.StartMenu.Caption,
                            href: menu.TopSideMenu.GreetingsMenu.StartMenu.Href,
                            isExpanded: false,
                            isActive: false
                        },
                        children: menu.TopSideMenu.GreetingsMenu.Children.map(item2 => {
                            return {
                                key: item2.Caption,
                                faIcon: item2.FaIcon,
                                caption: item2.Caption,
                                href: item2.Href,
                                isExpanded: false,
                                isActive: false
                            };
                        })
                    };

            const topMenuExit = {
                categoryKey: menu.TopSideMenu.ExitMenu.CategoryKey,
                startMenu: {
                    key: menu.TopSideMenu.ExitMenu.StartMenu.Caption,
                    faIcon: menu.TopSideMenu.ExitMenu.StartMenu.FaIcon,
                    caption: menu.TopSideMenu.ExitMenu.StartMenu.Caption,
                    href: menu.TopSideMenu.ExitMenu.StartMenu.Href,
                    isExpanded: false,
                    isActive: false
                },
                children: []
            };

            args.success({
                menu: {
                    leftSideMenu: leftMenu,
                    topSideMenu: {
                        balanceMenu: topMenuBalance,
                        greetingsMenu: topMenuGreetings,
                        exitMenu: topMenuExit,
                    }
                }
            });
        }
        catch (er) {
            args.failed({
                error: er
            });
        }
    }
}