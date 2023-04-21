import mongoose from 'mongoose'

const Schema = mongoose.Schema

const championSchema = new Schema({
  name: String,
  passive: String,
  ability1: String,
  ability2: String,
  ability3: String,
  ultimate: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const Champion = mongoose.model('Champion', championSchema)

export {
  Champion
}