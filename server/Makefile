# Run the dev environment
dev:
	python3 campus_hub/app.py

# Run in production
prod:
	gunicorn --config campus_hub/gunicorn.py campus_hub.app:app

# Lint check all the files
lint:
	ruff check .

# Lint fix files if possible
lint-fix:
	ruff check . --fix

# Format all the files
format:
	ruff format .

# Run tests
test:
	pytest --cov-report term --cov-report html --cov=./ ./tests