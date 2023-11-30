import dayjs from "dayjs";

export const mmDdYYYYhhMmSs = "YYYY-MM-DD HH:mm:ss";

export const parseApiDateToView = (utcDate: string) => dayjs.utc(utcDate);
