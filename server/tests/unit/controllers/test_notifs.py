import pytest
from campus_hub.models.notification import Notification
from pydantic import ValidationError

def test_notification_model():
    # Create a valid notification
    notification_data = {
        "recipient_id": "123456",
        "message": "You have a new notification!",
        "seen_status": False
    }
    notification = Notification(**notification_data)
    
    # Check that the attributes are set correctly
    assert notification.recipient_id == "123456"
    assert notification.message == "You have a new notification!"
    assert notification.seen_status == False

    # Create a notification with invalid data (missing required field)
    invalid_data = {
        "message": "This should fail"
    }
    # Check that creating with missing required field raises a ValidationError
    with pytest.raises(ValidationError):
        Notification(**invalid_data)

if __name__ == "__main__":
    pytest.main()
