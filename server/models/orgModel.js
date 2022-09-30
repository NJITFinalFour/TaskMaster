import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orgSchema = new Schema({
  name: {
    type: String,
    required: true,

  },
});

orgSchema.statics.signup = async function (name) {
  if (!name) {
    throw Error("We need an organization name.");
  }

  const org = await this.create({ name });

  return org;
};

const Organization = mongoose.model("Organization", orgSchema);

export default Organization;
