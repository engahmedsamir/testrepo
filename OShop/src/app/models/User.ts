export interface User {
    Id: number;
    Email: string;
    Password: string;
    Salt: string;
    IsAdmin: Boolean;
    UserName: string;
}