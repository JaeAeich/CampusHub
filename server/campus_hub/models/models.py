"""campus_hub schema models."""

from typing import List
from pydantic import BaseModel

class ServiceModel(BaseModel):
    service_id: str
    service_name: str
    pics: str
    service_cat: List[str]
