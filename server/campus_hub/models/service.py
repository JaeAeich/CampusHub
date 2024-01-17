from typing import List, Optional
from pydantic import BaseModel


class Service(BaseModel):
    """Pydantic model representing a service. A service represents
    a category of shops that can be offered by a campus, like food,
    laundry, etc.

    Attributes:
        service_id: Unique identifier for the service.
        store_ids: List of store IDs associated with the service.
        service_name: Name of the service.
        service_description: Description of the service.
        service_images: List of image references related to the service.
        service_categories: Categories associated with the service.
    """

    service_id: str
    store_ids: List[str]
    service_name: str
    service_description: Optional[str]
    service_images: List[str]
    service_categories: List[str]