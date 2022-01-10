import { mergeDeepRight, prop, path } from 'ramda';
import { environment } from '../environments/environment';

const getEnv = (): any => {
    return environment;
}

export const getEndpoint = (end: string, host = 'default'): string => {
    const dataEnv = getEnv();
    if (prop(host, dataEnv.hosts) && prop(end, dataEnv.endpoints)) {
        return prop(host, dataEnv.hosts) + '' + prop(end, dataEnv.endpoints);
    }
    return '';
}