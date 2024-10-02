from dataclasses import dataclass

from app.models import SCENARIOS, PAYMENT_TYPES, ELIGIBLE_MERCHANTS


async def get_make_payment_form() -> dict:
    return {
        'scenarios': SCENARIOS,
        'payment_types': PAYMENT_TYPES,
        'merchants': ELIGIBLE_MERCHANTS
    }

@dataclass
class ServerSentEvent:
    data: str
    retry: int | None
    event: str | None = None
    id: int | None = None

    def encode(self) -> bytes:
        message = f"data: {self.data}"
        if self.event is not None:
            message = f"{message}\nevent: {self.event}"
        if self.id is not None:
            message = f"{message}\nid: {self.id}"
        if self.retry is not None:
            message = f"{message}\nretry: {self.retry}"
        message = f"{message}\n\n"
        return message.encode('utf-8')