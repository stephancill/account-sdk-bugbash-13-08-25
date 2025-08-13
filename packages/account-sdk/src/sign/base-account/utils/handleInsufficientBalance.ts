import { InsufficientBalanceErrorData, standardErrors } from ':core/error/errors.js';
import { RequestArguments } from ':core/provider/interface.js';
import { Address } from ':core/type/index.js';
import { assertPresence } from ':util/assertPresence.js';
import { PublicClient } from 'viem';
import { presentSubAccountFundingDialog } from '../utils.js';
import { routeThroughGlobalAccount } from './routeThroughGlobalAccount.js';

export async function handleInsufficientBalanceError({
  globalAccountAddress,
  subAccountAddress,
  client,
  request,
  globalAccountRequest,
}: {
  errorData: InsufficientBalanceErrorData;
  globalAccountAddress: Address;
  subAccountAddress: Address;
  request: RequestArguments;
  client: PublicClient;
  globalAccountRequest: (request: RequestArguments) => Promise<unknown>;
}) {
  const chainId = client.chain?.id;
  assertPresence(chainId, standardErrors.rpc.internal(`invalid chainId`));

  try {
    await presentSubAccountFundingDialog();
  } catch {
    throw new Error('User cancelled funding');
  }

  const result = await routeThroughGlobalAccount({
    request,
    globalAccountAddress,
    subAccountAddress,
    client,
    globalAccountRequest,
    chainId,
  });

  return result;
}
