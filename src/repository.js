import crypto from 'crypto';

const disciplinasRepository = () => {
   const disciplinas = [];
 
   const create = ({ name, cargaHoraria, obrigatoria }) => {
      const newDisciplina = {
         id: crypto.randomUUID(),
         name,
         cargaHoraria,
         obrigatoria
      };
      disciplinas.push(newDisciplina);
      return newDisciplina;
   };
 
   const list = (name = "") => {
      return disciplinas.filter(disciplina  => {
         return disciplina.name.toLowerCase().includes(name.toLowerCase());
      });
   };
 
   const findById = (id) => {
      return disciplinas.find(disciplina => disciplina.id === id);
   }

   const update = (id, data) => {
      const disciplina = disciplinas.find(disciplina => disciplina.id === id);
      if (!disciplina) return null;
      disciplina.name = data.name;
      disciplina.cargaHoraria = data.cargaHoraria;
      disciplina.obrigatoria = data.obrigatoria;
      return disciplina;
   };
 
   const remove = (id) => {
      const index = disciplinas.findIndex(disciplina => disciplina.id === id);
      if (index === -1) return false;
      disciplinas.splice(index, 1);
      return true;
   };
 
   return {
        create,
        findById,
        list,
        update,
        remove
   };
 };

 export default disciplinasRepository;