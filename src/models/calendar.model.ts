export class CalendarFormat {
    year: number | string;
    monthList: Array<MonthFormat>;
}

export class MonthFormat {
    month: string;
    selected: boolean;
}