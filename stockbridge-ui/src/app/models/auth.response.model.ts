export interface AuthResponseModel {
    data: {
        userGroup: number;
        token: string;
    };
    status: number;
    error: string;
}