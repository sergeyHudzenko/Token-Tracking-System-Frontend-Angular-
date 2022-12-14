import { ILedger } from '../../models/ledger/ILedger';
import { LedgerTransactionType } from '../../models/ledger/ledger-transaction-type.enum';
import { AccountService } from '../../services/account/account.service';
import { ErrorService } from '../../services/error/error.service';
import { InformationService } from '../../services/information/information.service';

const accountService = new AccountService(
  new ErrorService(),
  new InformationService()
);

const tableSize = 10;
let accountBalance = 0;
let id = 0;

accountService.get().subscribe((info) => {
  accountBalance = info.accountBalance;
});

const generateAmount = (): number => {
  const max = 100;
  const min = 1;
  return Math.floor(Math.random() * (max - min)) + min;
};

const fieldsFactory = () => {
  const amount = generateAmount();
  let transactionType, title;

  if (Math.random() > 0.5) {
    title = `Purchased ${amount} tokens`;
    transactionType = LedgerTransactionType.PurchaseToken;
    accountBalance += amount;
  } else {
    title = `Spend ${amount} tokens to Casino Royal`;
    transactionType = LedgerTransactionType.SpendTokens;
    accountBalance -= amount;
  }

  if (accountBalance < 0) {
    return fieldsFactory();
  }

  id++;

  return {
    id,
    title,
    amount,
    accountBalance,
    transactionType,
    date: new Date(),
  };
};

const ledgerData: ILedger[] = [];

for (let i = 0; i < tableSize; i++) {
  ledgerData.push(fieldsFactory());
}

accountService.set(ledgerData[ledgerData.length - 1].accountBalance);

export default ledgerData;
