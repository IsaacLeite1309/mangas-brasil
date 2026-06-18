const request = require('supertest');
const mongoose = require('mongoose');
const Manga = require('../models/mangaModel');
const { app } = require('../app');

jest.mock('../models/mangaModel');

const mangaMock = {
  _id: '507f1f77bcf86cd799439011',
  titulo: 'Monster',
  autor: 'Naoki Urasawa',
  editora: 'Panini',
  edicao: 'Kanzenban',
  preco: 49.9,
  capa: 'https://example.com/monster.jpg',
  sinopse: 'Um suspense psicologico.'
};

describe('Rotas de mangas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/mangas', () => {
    it('deve cadastrar um manga', async () => {
      Manga.create.mockResolvedValue(mangaMock);

      const response = await request(app)
        .post('/api/mangas')
        .send({
          titulo: mangaMock.titulo,
          autor: mangaMock.autor,
          editora: mangaMock.editora
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mangaMock);
      expect(Manga.create).toHaveBeenCalledWith({
        titulo: mangaMock.titulo,
        autor: mangaMock.autor,
        editora: mangaMock.editora
      });
    });

    it('deve retornar 400 quando houver erro de validacao', async () => {
      Manga.create.mockRejectedValue(new Error('titulo e obrigatorio'));

      const response = await request(app)
        .post('/api/mangas')
        .send({ autor: mangaMock.autor });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Erro ao cadastrar manga.');
      expect(response.body.error).toBe('titulo e obrigatorio');
    });
  });

  describe('GET /api/mangas', () => {
    it('deve listar mangas ordenados por titulo', async () => {
      const sort = jest.fn().mockResolvedValue([mangaMock]);
      Manga.find.mockReturnValue({ sort });

      const response = await request(app).get('/api/mangas');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mangaMock]);
      expect(Manga.find).toHaveBeenCalledWith();
      expect(sort).toHaveBeenCalledWith({ titulo: 1 });
    });

    it('deve retornar 500 quando a listagem falhar', async () => {
      Manga.find.mockImplementation(() => {
        throw new Error('falha no banco');
      });

      const response = await request(app).get('/api/mangas');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erro ao buscar mangas.');
      expect(response.body.error).toBe('falha no banco');
    });
  });

  describe('GET /api/mangas/:id', () => {
    it('deve buscar um manga por id', async () => {
      Manga.findById.mockResolvedValue(mangaMock);

      const response = await request(app).get(`/api/mangas/${mangaMock._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mangaMock);
      expect(Manga.findById).toHaveBeenCalledWith(mangaMock._id);
    });

    it('deve retornar 400 para id invalido', async () => {
      const response = await request(app).get('/api/mangas/id-invalido');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('ID invalido.');
      expect(Manga.findById).not.toHaveBeenCalled();
    });

    it('deve retornar 404 quando o manga nao existir', async () => {
      Manga.findById.mockResolvedValue(null);

      const response = await request(app).get(`/api/mangas/${mangaMock._id}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Manga nao encontrado.');
    });

    it('deve retornar 500 quando a busca falhar', async () => {
      Manga.findById.mockRejectedValue(new Error('erro inesperado'));

      const response = await request(app).get(`/api/mangas/${mangaMock._id}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erro ao buscar manga.');
      expect(response.body.error).toBe('erro inesperado');
    });
  });

  describe('PUT /api/mangas/:id', () => {
    it('deve atualizar um manga por id', async () => {
      const mangaAtualizado = { ...mangaMock, preco: 59.9 };
      Manga.findByIdAndUpdate.mockResolvedValue(mangaAtualizado);

      const response = await request(app)
        .put(`/api/mangas/${mangaMock._id}`)
        .send({ preco: 59.9 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mangaAtualizado);
      expect(Manga.findByIdAndUpdate).toHaveBeenCalledWith(
        mangaMock._id,
        { preco: 59.9 },
        { new: true, runValidators: true }
      );
    });

    it('deve retornar 400 para id invalido ao atualizar', async () => {
      const response = await request(app)
        .put('/api/mangas/id-invalido')
        .send({ preco: 59.9 });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('ID invalido.');
      expect(Manga.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('deve retornar 404 quando nao encontrar manga para atualizar', async () => {
      Manga.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put(`/api/mangas/${mangaMock._id}`)
        .send({ preco: 59.9 });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Manga nao encontrado.');
    });

    it('deve retornar 400 quando a atualizacao falhar', async () => {
      Manga.findByIdAndUpdate.mockRejectedValue(new Error('preco invalido'));

      const response = await request(app)
        .put(`/api/mangas/${mangaMock._id}`)
        .send({ preco: -10 });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Erro ao atualizar manga.');
      expect(response.body.error).toBe('preco invalido');
    });
  });

  describe('DELETE /api/mangas/:id', () => {
    it('deve remover um manga por id', async () => {
      Manga.findByIdAndDelete.mockResolvedValue(mangaMock);

      const response = await request(app).delete(`/api/mangas/${mangaMock._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Manga removido com sucesso.');
      expect(response.body.manga).toEqual(mangaMock);
      expect(Manga.findByIdAndDelete).toHaveBeenCalledWith(mangaMock._id);
    });

    it('deve retornar 400 para id invalido ao remover', async () => {
      const response = await request(app).delete('/api/mangas/id-invalido');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('ID invalido.');
      expect(Manga.findByIdAndDelete).not.toHaveBeenCalled();
    });

    it('deve retornar 404 quando nao encontrar manga para remover', async () => {
      Manga.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete(`/api/mangas/${mangaMock._id}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Manga nao encontrado.');
    });

    it('deve retornar 500 quando a remocao falhar', async () => {
      Manga.findByIdAndDelete.mockRejectedValue(new Error('erro ao excluir'));

      const response = await request(app).delete(`/api/mangas/${mangaMock._id}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erro ao remover manga.');
      expect(response.body.error).toBe('erro ao excluir');
    });
  });

  describe('GET /api/health', () => {
    it('deve retornar status da API', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        service: 'MangaBrasil API - N3 Devops'
      });
    });
  });

  describe('GET /', () => {
    it('deve retornar informacoes da API', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        service: 'MangaBrasil API - N3 Devops',
        status: 'online',
        endpoints: {
          health: '/api/health',
          mangas: '/api/mangas'
        }
      });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
