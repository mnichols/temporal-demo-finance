package io.temporal.finance.domain.messaging.queries;

import io.temporal.finance.domain.messaging.commands.CreateTransactionResponse;
import io.temporal.finance.domain.messaging.orchestrations.MakePaymentRequest;
import io.temporal.finance.domain.messaging.values.PaymentDescriptor;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PaymentState {

  private boolean isTippable;
  private int tipAmountCents;
  MakePaymentRequest request;
  List<PaymentDescriptor> descriptors = new ArrayList<>();
  boolean isValid = false;
  private boolean isTransactionCompleted;
  private String failure;

  public PaymentState() {}

  public PaymentState(MakePaymentRequest request) {
    this.request = request;
    this.descriptors = Arrays.asList(request.descriptors());
    this.tipAmountCents = request.tipAmountCents();
    this.isValid = true;
  }

  public int getTipAmountCents() {
    return tipAmountCents;
  }

  public void setTipAmountCents(int tipAmountCents) {
    this.tipAmountCents = tipAmountCents;
  }

  public int getTotalAmountCents() {
    return totalAmountCents;
  }

  public void setTotalAmountCents(int totalAmountCents) {
    this.totalAmountCents = totalAmountCents;
  }

  int totalAmountCents = 0;

  public CreateTransactionResponse getTransaction() {
    return transaction;
  }

  public void setTransaction(CreateTransactionResponse transaction) {
    this.transaction = transaction;
  }

  CreateTransactionResponse transaction;

  public List<PaymentDescriptor> getDescriptors() {
    return descriptors;
  }

  public void setDescriptors(List<PaymentDescriptor> descriptors) {
    this.descriptors = descriptors;
  }

  public boolean isValid() {
    return isValid;
  }

  public void setValid(boolean valid) {
    isValid = valid;
  }

  public String getMerchantId() {
    return request.merchantId();
  }

  public String getRemoteId() {
    return request.remoteId();
  }

  public int getRequestAttempts() {
    return request.requestAttempts();
  }

  public boolean isTippable() {
    return isTippable;
  }

  public void setTippable(boolean tippable) {
    isTippable = tippable;
  }

  public void setTransactionCompleted(boolean completed) {
    this.isTransactionCompleted = true;
  }

  public boolean isTransactionCompleted() {
    return isTransactionCompleted;
  }

  public String getFailure() {
    return failure;
  }

  public void setFailure(String failure) {
    this.failure = failure;
  }
}
