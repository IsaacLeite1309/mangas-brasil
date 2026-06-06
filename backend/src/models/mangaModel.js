const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    autor: {
      type: String,
      required: true,
      trim: true
    },
    editora: {
      type: String,
      required: true,
      trim: true
    },
    edicao: {
      type: String,
      trim: true,
      default: ''
    },
    preco: {
      type: Number,
      min: 0,
      default: 0
    },
    capa: {
      type: String,
      trim: true,
      default: ''
    },
    sinopse: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Manga', mangaSchema);
