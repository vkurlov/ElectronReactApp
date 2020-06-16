export const appRoutes = (() => {
    const basePath = process.env.PUBLIC_URL;
    return {
        /**
         * Route стартовой страницы
         *     {basePath}
         */
        homeRoute: '',
        /**
         * Route для редактирования справочника CloudServices
         *     {basePath}/administration/cloud-services
         */
        editCloudServicesRoute: `${basePath}/administration/dictionary/cloud-services`
    };
})();