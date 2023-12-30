# CampusHub Backend 

## Get started

1. **Install Poetry:**
   If Poetry is not already installed, users can install it using the following command. Follow the installation instructions on the Poetry website: [https://python-poetry.org/docs/](https://python-poetry.org/docs/)

2. **Create a Virtual Environment:**
   Create a virtual environment using venv or conda.

3. **Install Dependencies:**
   Once inside the project directory, install the project dependencies using Poetry:

   ```bash
   poetry install
   ```
4. **Set Up Configuration Files:**
   Users might need to configure certain settings for the project. Check if there are any configuration files (e.g., `gunicorn.py`) that need customization.

5. **Run Development Server:**
   To run the development server, users can use the provided `Makefile`:

   ```bash
   make dev
   ```

   Alternatively, if you're not using the `Makefile`, users can use the following command:

   ```bash
   python3 campus_hub/app.py
   ```

   This will start the Flask development server.

6. **Access the Application:**
   Once the development server is running, users can access the `swagger UI` application by navigating to [http://127.0.0.1:8081/campus_hub/v1/ui](http://127.0.0.1:8081/campus_hub/v1/ui) in their web browser.

7. **Additional Commands:**
   Check the `Makefile` for additional commands or scripts that facilitate common tasks, such as testing, linting, or building.

   ```bash
   make test      # Run tests
   make lint      # Run linters
   ```