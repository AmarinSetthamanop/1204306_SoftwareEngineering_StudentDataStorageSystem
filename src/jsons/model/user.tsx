export interface Usermodel {
    id:       string;
    no:       string;
    fname:    string;
    nickname: string;
    date:     DateClass;
}

export interface DateClass {
    day:  number;
    mo:   number;
    year: number;
}
