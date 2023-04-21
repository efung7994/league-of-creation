import mongoose from 'mongoose'

const Schema = mongoose.Schema

const championSchema = new Schema({
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const Champion = mongoose.model('Champion', championSchema)

export {
  Champion
}