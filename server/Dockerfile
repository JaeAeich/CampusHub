###################################################
#   Stage 1:                                      #
#   Use a larger base image for building          #
###################################################
FROM python:3.11-bookworm AS builder

WORKDIR /app

# Copy only necessary files
COPY pyproject.toml poetry.lock /app/

# Install poetry
RUN pip install poetry && \
    poetry install --no-dev --no-interaction --no-ansi && \
    poetry export -f requirements.txt -o requirements.txt
    
###################################################
#   Stage 2:                                      #
#   Switch to a smaller base image for runtime    #
###################################################
FROM python:3.11-slim-bookworm

WORKDIR /app

# Copy only necessary files, including the installed dependencies
COPY --from=builder /app/requirements.txt .
COPY . /app/

RUN set -ex \
    # Create a non-root user
    && addgroup --system --gid 1001 appgroup \
    && adduser --system --uid 1001 --gid 1001 --no-create-home appuser \
    # Upgrade the package index and install security upgrades
    && apt-get update \
    && apt-get upgrade -y \
    # Install dependencies
    && pip install -r requirements.txt \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Run production server
CMD ["gunicorn", "--config", "campus_hub/gunicorn.py", "campus_hub.app:app"]
