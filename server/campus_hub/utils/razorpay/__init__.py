import razorpay
import os

razorpay_id = os.environ.get("RAZORPAY_ID")
razorpay_secret = os.environ.get("RAZORPAY_ID")
client = razorpay.Client(auth=(razorpay_id, razorpay_secret))
