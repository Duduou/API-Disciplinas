import express from 'express';
import disciplinasRepository from './repository.js';

const disciplinas = disciplinasRepository();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/disciplinas', (req, res) => {
    const { name } = req.query;
    const list = disciplinas.list(name);
    res.json(list);
});

app.get('/disciplinas/:id', (req, res) => {
    const { id } = req.params;
    const disciplina = disciplinas.findById(id);
    if (!disciplina) {
        return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.json(disciplina);
});

app.post('/disciplinas', (req, res) => {
    const { name, cargaHoraria, obrigatoria } = req.body;
    const disciplina = disciplinas.create({ name, cargaHoraria, obrigatoria });
    res.status(201).json(disciplina);
});

app.delete('/disciplinas/:id', (req, res) => {
    const { id } = req.params;
    const result = disciplinas.remove(id);
    if (!result) {
        return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.status(204).send();
});

app.put('/disciplinas/:id', (req, res) => {
    const { name, cargaHoraria, obrigatoria } = req.body;
    const { id } = req.params;
    const disciplina = disciplinas.update(id, { name, cargaHoraria, obrigatoria });
    if (!disciplina) {
        return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.json(disciplina);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});