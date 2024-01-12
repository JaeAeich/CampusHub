from pydantic import BaseModel, validator
from typing import Literal


class Payment(BaseModel):
    """
    Pydantic model representing a payment.

    Attributes:
        transaction_id: Identifier for the payment transaction.
        payment_mode: Mode of payment.
        amount: Amount paid.
        description: Description of the payment.
        source: Source of the payment.
        currency: Currency used for the payment.
        upi_id: UPI ID associated with the payment.
        payment_status: Status of the payment.
    """

    transaction_id: str
    payment_mode: str
    amount: float
    description: str
    source: str
    currency: Literal[
        "USD",
        "AED",
        "AFN",
        "ALL",
        "AMD",
        "ANG",
        "AOA",
        "ARS",
        "AUD",
        "AWG",
        "AZN",
        "BAM",
        "BBD",
        "BDT",
        "BGN",
        "BIF",
        "BMD",
        "BND",
        "BOB",
        "BRL",
        "BSD",
        "BWP",
        "BYN",
        "BZD",
        "CAD",
        "CDF",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "CVE",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EGP",
        "ETB",
        "EUR",
        "FJD",
        "FKP",
        "GBP",
        "GEL",
        "GIP",
        "GMD",
        "GNF",
        "GTQ",
        "GYD",
        "HKD",
        "HNL",
        "HTG",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "ISK",
        "JMD",
        "JPY",
        "KES",
        "KGS",
        "KHR",
        "KMF",
        "KRW",
        "KYD",
        "KZT",
        "LAK",
        "LBP",
        "LKR",
        "LRD",
        "LSL",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MNT",
        "MOP",
        "MUR",
        "MVR",
        "MWK",
        "MXN",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "NZD",
        "PAB",
        "PEN",
        "PGK",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SBD",
        "SCR",
        "SEK",
        "SGD",
        "SHP",
        "SLE",
        "SOS",
        "SRD",
        "STD",
        "SZL",
        "THB",
        "TJS",
        "TOP",
        "TRY",
        "TTD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "UYU",
        "UZS",
        "VND",
        "VUV",
        "WST",
        "XAF",
        "XCD",
        "XOF",
        "XPF",
        "YER",
        "ZAR",
        "ZMW",
    ]
    upi_id: str
    payment_status: Literal["COD", "UPI"]

    @validator(
        "transaction_id",
        "payment_mode",
        "amount",
        "description",
        "source",
        "currency",
        "upi_id",
        "payment_status",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (transaction_id, payment_mode, amount, description, source, currency, upi_id, payment_status) are always present.
        """
        required_fields = [
            "transaction_id",
            "payment_mode",
            "amount",
            "description",
            "source",
            "currency",
            "upi_id",
            "payment_status",
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for payment: {', '.join(missing_fields)}"
            )

        return value