export declare function validateReq<T>(option: T, vo: any): Promise<string | undefined>;
export declare function get<T, V>(url: string, option: T, vo?: V): Promise<any>;
export declare function post<T, V>(url: string, option: T, vo?: V): Promise<any>;
