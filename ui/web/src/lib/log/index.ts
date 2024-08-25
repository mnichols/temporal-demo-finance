import {ROARR, Roarr} from 'roarr';

let loggers: Record<string, any> = {
    10: console.trace.bind(console),
    20: console.debug.bind(console),
    30: console.log.bind(console),
    40: console.warn.bind(console),
    50: console.error.bind(console),
    60: console.error.bind(console),
}
ROARR.write = (message) => {
    let input = JSON.parse(message)
    let writer = loggers[input?.logLevel] || loggers[20]
    writer(input?.message, input);
};

export const Logger = Roarr.child({
    application: 'temporal',
})