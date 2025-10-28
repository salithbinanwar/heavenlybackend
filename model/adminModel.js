import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

//* hashing password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('adminPassword')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.adminPassword = await bcrypt.hash(this.adminPassword, salt)
})

//* comparing password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  // console.log(enteredPassword, this.adminPassword)
  return await bcrypt.compare(enteredPassword, this.adminPassword)
}

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
