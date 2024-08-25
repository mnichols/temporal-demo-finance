import { parseISO }  from 'date-fns'
import formatRFC3339 from 'date-fns/formatRFC3339/index.js'

interface Time {
    unmarshal(val: any): Date
    marshal(val: any): string
}
export const TimeScalar = {
    unmarshal : (val: any ): Date  => {
        // val is RFC3339 format
        const rfc3339Nano = "yyyy-MM-dd'T'hh:mm.SSSSSSSSS'Z'XXX"
        const sample = '2006-01-02T15:04:05.999999999Z07:00'
        const nonNanoSample = '2019-09-18T19:00:52Z'
        const r2 = "yyyy-MM-dd'T'kk:mm:ss.SSSSSSSSS'Z'XXX"
        console.log('parsing inbound val:', val)
        // we receive time.RFC3339Nano from Golang server
        try {
            let parsed = parseISO(val)
            return parsed
        } catch (err) {
            console.error(`error parsing incoming date in scalar#unmarshal ${val}`, val)
            throw err
        }
    },
    marshal : (val: any): string => {
        return formatRFC3339.default(val, {fractionDigits: 3})
    },
}