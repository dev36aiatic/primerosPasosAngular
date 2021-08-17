import mongoose from 'mongoose';

const schema = mongoose.Schema;

/**
 * Crea una un nuevo modelo de perfil
 * @class 
 * @property {string} [cc] - Identificador del usuario
 * @property {string} [address] - Direccion del usuario
 * @property {string} [dateOfBith] - Fecha de nacimiento
 * @property {string} [city] - Ciudad donde vide
 * @property {string} [department] - Departamento donde vide
 * @property {string} [country] - Pais donde vive
 * @property {string} [postal] - Codigo postal
 * @property {string} [profession] - Profesion
 * @property {string} [skills] - Habilidades
 * @property {string} [description] - Descripcion de su persona
 */

const ProfileSchema = new schema({
  cc: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  ZIP: {
    type: Number,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  skills: {
    type: [],
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);

export {
  Profile
}