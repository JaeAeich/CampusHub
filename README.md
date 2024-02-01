# Campus Hub

<img src="./assets/logo.png" alt="Alt Text" width="200"/>

The Campus Hub stands as the ultimate nexus, seamlessly connecting you to a diverse array of services and products within your campus community. It aspires to be the premier destination for facilitating transactions, providing a dynamic marketplace for buying and selling, while also serving as a prime platform for effective advertising.

## API Reference

To thoroughly document our API, we rely on [OpenAPI3](https://www.openapis.org). You can review the YAML configuration in [api.yaml](/server/campus_hub/specs/api.yaml). For an interactive documentation experience, please visit our [Swagger interface](https://campushub-server.onrender.com/campus_hub/v1/ui/).

> Note: The Swagger interface on the stable release may occasionally lag behind in terms of the latest updates or could omit certain endpoints. For the most up-to-date information, we recommend building the Swagger documentation from the source. You can achieve this by using `docker compose` or by running the development environment of the project.

## Start Dev environment

The Campus Hub is highly configurable, offering various ways to initiate the development version based on your requirements. Here are a few options:

### Using `docker compose`

To initialize everything with just a few commands, covering database, server, and client components, we recommend using Docker Compose.

```
docker compose up --build -d
```

This command will launch the development environment. You can access the `frontend/client portal` at [http://localhost:3000](http://localhost:3000), and the `Swagger interface` should be available at [http://localhost:8080/campus_hub/v1/ui](http://localhost:8080/campus_hub/v1/ui). By default, a MongoDB container will be set up, exposing persistent data in the project's `root` folder.

> **Note:** Ensure you have environment files for each container. We provide `*.env.sample` files that serve as placeholder environment configurations. To use the default configuration, remove the `.sample` extension and delete all comments inside the `.env` files. 

#### Configuring docker compose

- MongoDB Atlas
    - If you already have a ***compliant*** database setup, you can use Atlas with minor changes in the environment files. Modify the default `server.env` and use your MongoDB Atlas configuration. Then, start the server with your database.

### Using Native Development Tools

#### Client

To initiate the development environment for the client using `npm`, follow these steps:

- Install all dependencies:

```bash
npm install
```

- Start the development environment:

```bash
npm run dev
```

> **Note:** Execute these commands within the `client` directory.

#### Server

For server development scripts, we utilize a [Makefile](/server/Makefile).

- Install dependencies:

```bash
poetry install
```

- Start the development environment:

```bash
python3 campus_hub/app.py
```

> **Note:** Execute these commands within the `server` directory. These instructions assume basic requirements are met, such as creating a virtual environment for the project.

### Using Docker Registry

To leverage stable releases, pull backend images from our [Dockerhub repositories](https://hub.docker.com/r/jaeaeich/campushub-server) and run services as containers instead of building them.

#### Backend Image

Pull the backend image with the following command:

```bash
docker pull jaeaeich/campushub-server
```

Specify the tag based on your requirements and changelogs. Don't forget to configure environment variables for this container.


> **Note:** Currently we are only rolling server as container.

## Tech Stack

### Client

- **Package Manager:** [npm](https://www.npmjs.com)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Frontend Framework:** [React](https://react.dev)
- **UI Library:** [ShadCn](https://ui.shadcn.com/docs)
- **Styling Utility:** [Tailwind](https://tailwindcss.com)
- **Build Tool:** [Vite](https://vitejs.dev)
- **Code Quality Tools:** [ESLint](https://eslint.org), [Prettier](https://prettier.io)

### Server

- **Web Framework:** [Connexion](connexion.readthedocs.io/en/latest/)
- **API Framework:** [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- **API Documentation:** [Swagger](https://swagger.io)
- **Data Validation:** [Pydantic](https://docs.pydantic.dev/)
- **Database Driver:** [PyMongo](pymongo.readthedocs.io/en/stable/)
- **Testing Framework:** [PyTest](https://docs.pytest.org/en/8.0.x/)
- **Code Quality Tools:** [Ruff](https://docs.astral.sh/ruff/)
- **Type Checking:** [Mypy](mypy.readthedocs.io/en/stable/)
- **HTTP Server:** [Gunicorn](gunicorn.org/#quickstart)