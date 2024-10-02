package io.temporal.finance.domain.messaging.queries;

import io.temporal.finance.domain.messaging.orchestrations.MakePaymentRequest;
import io.temporal.finance.domain.messaging.values.PaymentDescriptor;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PaymentState {
  MakePaymentRequest request;
  List<PaymentDescriptor> descriptors = new ArrayList<>();
  String transactionId;
  boolean isValid = false;

  public PaymentState() {}

  public PaymentState(MakePaymentRequest request) {
    this.request = request;
    this.descriptors = Arrays.asList(request.descriptors());
    this.isValid = true;
  }

  public List<PaymentDescriptor> getDescriptors() {
    return descriptors;
  }

  public void setDescriptors(List<PaymentDescriptor> descriptors) {
    this.descriptors = descriptors;
  }

  public String getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(String transactionId) {
    this.transactionId = transactionId;
  }

  public boolean isValid() {
    return isValid;
  }

  public void setValid(boolean valid) {
    isValid = valid;
  }
}
