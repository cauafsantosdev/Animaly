# Animaly - Animal Management

Animaly is an introductory project to the concepts of API development. The application allows you to register, delete, list and search for animals.

## Done with: 

- **Front-end:** HTML, Tailwind CSS and JavaScript  
- **Back-end:** Python com FastAPI  
- **Database:** CSV file  

## How to run the project:

### 1. Clone the repo 

```bash
git clone https://github.com/cauafsantosdev/Animaly
cd Animaly
```
### 2. Install the dependencies

```bash
pip install -r requirements.txt
```

### 3. Start FastAPI server

```bash
cd src/
uvicorn server:app --host 127.0.0.1 --port 8000
```

### 4. Open the HTML

**Open the public/index.html file on your browser or run it through Live Server VS Code extension.**

## Future updates:
- Add authentication and user profile.
- Add more details to the animals.
- Add Update functionalities.
- Add a SQL database.
- Remake the UI.
