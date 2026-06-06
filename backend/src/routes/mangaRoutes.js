const express = require('express');
const mongoose = require('mongoose');
const Manga = require('../models/mangaModel');

const router = express.Router();

function idInvalido(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  try {
    const manga = await Manga.create(req.body);
    return res.status(201).json(manga);
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao cadastrar manga.',
      error: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const mangas = await Manga.find().sort({ titulo: 1 });
    return res.status(200).json(mangas);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar mangas.',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (idInvalido(id)) {
      return res.status(400).json({ message: 'ID invalido.' });
    }

    const manga = await Manga.findById(id);

    if (!manga) {
      return res.status(404).json({ message: 'Manga nao encontrado.' });
    }

    return res.status(200).json(manga);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar manga.',
      error: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (idInvalido(id)) {
      return res.status(400).json({ message: 'ID invalido.' });
    }

    const manga = await Manga.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!manga) {
      return res.status(404).json({ message: 'Manga nao encontrado.' });
    }

    return res.status(200).json(manga);
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao atualizar manga.',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (idInvalido(id)) {
      return res.status(400).json({ message: 'ID invalido.' });
    }

    const manga = await Manga.findByIdAndDelete(id);

    if (!manga) {
      return res.status(404).json({ message: 'Manga nao encontrado.' });
    }

    return res.status(200).json({
      message: 'Manga removido com sucesso.',
      manga
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao remover manga.',
      error: error.message
    });
  }
});

module.exports = router;
