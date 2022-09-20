import mongoose from "mongoose";

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

organizationSchema.statics.signup = async function (name) {
    if (!name) {
        throw Error("We need an organization name.");
    };

    const organization = await this.create({ name });
};

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;