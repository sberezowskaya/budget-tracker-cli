/// <reference path="IAccount.ts" />
/// <reference path="ISummary.ts" />

namespace BudgetTracker {
    export interface IAccountManager {
        accounts?: IAccount[];
        
        addAccount(account: IAccount): void;
        removeAccountById(accountId: number): boolean;
        getAccounts(): IAccount[];
        getAccountById(id: number): IAccount | undefined;
        getSummary(accountId: number): ISummary;
    }
}