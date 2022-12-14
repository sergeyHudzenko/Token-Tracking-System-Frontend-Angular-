import { LedgerTransactionType } from './ledger-transaction-type.enum';

export interface ILedger {
  id: number;
  title: string;
  transactionType: LedgerTransactionType;
  amount: number;
  accountBalance: number;
  date: Date;
}
