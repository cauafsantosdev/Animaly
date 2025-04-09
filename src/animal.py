import csv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()
db = "animal_db.csv"

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Animal(BaseModel):
    animal_id: int = 0
    name: str
    age: int
    sex: str
    colour: str

    
    def get_id(self):
        animal_list = all_animals()
        self.animal_id = len(animal_list)

    
def all_animals():
    animal_list = []
    with open(db, "r") as file:
        data = csv.reader(file, delimiter=';')
        for animal in data:
            animal_list.append(Animal(animal_id = int(animal[0]),
                                        name = animal[1],
                                        age = int(animal[2]),
                                        sex = animal[3],
                                        colour = animal[4]))
    return animal_list

@app.post("/animals")
def add_animal(animal: Animal):
    animal.get_id()

    with open(db, "a") as file:
        writer = csv.writer(file, delimiter=";")
        writer.writerow([int(animal.animal_id), animal.name, int(animal.age), animal.sex, animal.colour])
    
    return {"message": f"{animal.name} added sucessfully!"}

@app.get("/animals")
def get_animals():
    return all_animals()

@app.get("/animals/{animal_id}")
def search_animal(animal_id: int = 0):
    animal_list = all_animals()
    for animal in animal_list:
        if animal.animal_id == animal_id:
            return animal
    return {"message": "ID not found."}
        
@app.delete("/animals/{animal_id}")
def delete_animal(animal_id: int):
    animal_list = all_animals()
    for animal in animal_list:
        if animal.animal_id == animal_id:
            name = animal.name
            animal_list.remove(animal)
            
            for i in range(len(animal_list)):
                animal_list[i].animal_id = i

            with open(db, mode='w') as file:
                writer = csv.writer(file, delimiter=';')
                for animal in animal_list:
                    writer.writerow([int(animal.animal_id), animal.name, int(animal.age), animal.sex, animal.colour])
    
            return {"message": f"{name} removed succesfully!"}
    return {"message": "ID not found."}