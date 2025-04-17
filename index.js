import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta del archivo JSON
const ideasFilePath = path.join(__dirname, 'ideas.json');

// Leer el archivo JSON
const readIdeas = () => {
    if (!fs.existsSync(ideasFilePath)) {
        fs.writeFileSync(ideasFilePath, JSON.stringify([])); // Crea el archivo si no existe
    }
    const data = fs.readFileSync(ideasFilePath, 'utf-8');
    return data.trim() ? JSON.parse(data) : [];
};

// Escribir en el archivo JSON
const writeIdeas = (ideas) => {
    fs.writeFileSync(ideasFilePath, JSON.stringify(ideas, null, 2));
};

// Endpoint para obtener todas las ideas
app.get('/ideas', (_, res) => {
    const ideas = readIdeas();
    res.json(ideas);
});

// Endpoint para agregar una nueva idea
app.post('/enviar-idea', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Leer las ideas existentes
    const ideas = readIdeas();

    // Agregar la nueva idea
    const nuevaIdea = { id: Date.now(), nombre, email, mensaje };
    ideas.push(nuevaIdea);

    writeIdeas(ideas);

    res.status(201).json({ message: 'Sent!', idea: nuevaIdea });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("backend active")
});