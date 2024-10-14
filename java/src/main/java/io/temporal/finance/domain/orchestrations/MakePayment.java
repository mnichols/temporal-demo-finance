package io.temporal.finance.domain.orchestrations;

import io.temporal.finance.domain.messaging.commands.LeaveTipRequest;
import io.temporal.finance.domain.messaging.commands.LeaveTipResponse;
import io.temporal.finance.domain.messaging.orchestrations.MakePaymentRequest;
import io.temporal.finance.domain.messaging.queries.PaymentState;
import io.temporal.workflow.*;

@WorkflowInterface
public interface MakePayment {
  /*
   1. Validate the payment methods
   2. Create the transaction with my processor gateway
   3. Record the transaction with my Merchants service.
   3a. Compensate, as needed
   4. Allow time for a tip to arrive (optional)
   5. Mark transaction as completed
  */
  @WorkflowMethod
  void execute(MakePaymentRequest params);

  @QueryMethod
  PaymentState getState();

  @UpdateMethod
  LeaveTipResponse leaveTip(LeaveTipRequest cmd);

  @UpdateValidatorMethod(updateName = "leaveTip")
  void validateLeaveTip(LeaveTipRequest cmd);
}
