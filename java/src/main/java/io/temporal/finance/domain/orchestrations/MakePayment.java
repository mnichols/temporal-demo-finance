package io.temporal.finance.domain.orchestrations;

import io.temporal.finance.domain.messaging.commands.LeaveTipRequest;
import io.temporal.finance.domain.messaging.commands.LeaveTipResponse;
import io.temporal.finance.domain.messaging.orchestrations.MakePaymentRequest;
import io.temporal.finance.domain.messaging.queries.PaymentState;
import io.temporal.workflow.*;

@WorkflowInterface
public interface MakePayment {
  @WorkflowMethod
  void execute(MakePaymentRequest params);

  @QueryMethod
  PaymentState getState();

  @UpdateMethod
  LeaveTipResponse leaveTip(LeaveTipRequest cmd);

  @UpdateValidatorMethod(updateName = "leaveTip")
  void validateLeaveTip(LeaveTipRequest cmd);
}
