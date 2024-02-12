import razorpay
import os

client = razorpay.Client(auth=(os.environ.get("RAZORPAY_ID"), os.environ.get("RAZORPAY_SECRET")))
