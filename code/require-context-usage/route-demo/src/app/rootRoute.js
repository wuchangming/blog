import AppLayout from './AppLayout';
export default {
    path: '/',
    component: AppLayout,
    childRoutes: (r => {
        return r.keys().map(key => r(key).default);
    })(require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\/route\.js$/))
};
