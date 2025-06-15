export default ({ config }) => ({
    ...config,
    name: getAppName(),
    ios: {
        ...config.ios,
        bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
        ...config.android,
        package: getUniqueIdentifier(),
    },
});
// This is a placeholder for any future configuration changes
// that might be needed for the application.

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
    if (IS_DEV) {
        return 'com.chrisdono.golfcalcapp.dev';
    } 
    if (IS_PREVIEW) {
        return 'com.chrisdono.golfcalcapp.preview';
    } 
    
    return 'com.chrisdono.golfcalcapp';
}

const getAppName = () => {
    if (IS_DEV) {
        return 'GolfCalc (Development)';
    } 
    if (IS_PREVIEW) {
        return 'GolfCalc (Preview)';
    }
    
    return 'GolfCalc';
};