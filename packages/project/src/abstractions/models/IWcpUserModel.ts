export interface IWcpUserModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    orgs: Array<{ id: string; name: string }>;
    projects: Array<{ id: string; name: string }>;
}
