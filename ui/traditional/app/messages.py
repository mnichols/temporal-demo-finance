from dataclasses import dataclass

@dataclass
class PaymentDescriptor:
    paymentType: str
    amountCents: int
@dataclass
class MakePaymentRequest:
    remoteId: str
    merchantId: str
    descriptors: [PaymentDescriptor]
    tipAmountCents: int

@dataclass
class LeaveTipRequest:
    tipAmountCents: int
