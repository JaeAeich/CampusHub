import unittest
from campus_hub import gunicorn

class TestGunicornConfig(unittest.TestCase):
    def test_workers(self):
        self.assertEqual(gunicorn.workers, 2)

    def test_threads(self):
        self.assertEqual(gunicorn.threads, 4)

    def test_timeout(self):
        self.assertEqual(gunicorn.timeout, 120)

    def test_bind(self):
        self.assertEqual(gunicorn.bind, "0.0.0.0:8080")

    def test_forwarded_allow_ips(self):
        self.assertEqual(gunicorn.forwarded_allow_ips, "*")

    def test_secure_scheme_headers(self):
        self.assertEqual(gunicorn.secure_scheme_headers, {"X-Forwarded-Proto": "https"})

if __name__ == '__main__':
    unittest.main()

