import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  champions: [{type: Schema.Types.ObjectId, ref: 'Champion'}],
  roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
