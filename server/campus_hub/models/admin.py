from typing import List, Optional
from pydantic import BaseModel


class CampusAdmin(BaseModel):
    """
    Pydantic model representing a campus administrator.

    Attributes:
        admin_name: Name of the admin.
        admin_email: Email associated with the admin.
        admin_phone_number: Phone number associated with the admin.
        admin_gender: Gender of the admin.
        admin_image: Optional image reference representing the admin.
        admin_id: Unique identifier for the admin.
        assigned_campuses: List of campus IDs assigned to the admin.
    """

    admin_name: str
    admin_email: str
    admin_phone_number: str
    admin_gender: str  # You can customize this as per your requirement.
    admin_image: Optional[str]
    admin_id: str
    assigned_campuses: List[str]


class CampusAdminList(BaseModel):
    """
    Pydantic model representing a list of campus admins.

    Attributes:
        admins: List of campus administrators.
    """

    admins: List[CampusAdmin]
