import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roleSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const Role = mongoose.model('Role', roleSchema)

export {
  Role
}