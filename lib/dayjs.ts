import dayjsOrigin from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
dayjsOrigin.extend(relativeTime)


export const dayjs = dayjsOrigin