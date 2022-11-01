import Organization from "../models/orgModel.js";
import User from "../models/userModel.js";

export const orgSignup = async (req, res) => {
    const { organization, email, password, first_name, last_name } = req.body;

    try {
        const org = new Organization({name: organization});
        try {
            const user = await User.signup(email, password, org._id, first_name, last_name, true);
            org.save();
            res.send(user);
        } catch(error) {
            res.status(400).json({ error: error.message })
        }
    } catch(error) {
        res.status(400).json({ error: error.message });
    };
};

export const findAllOrgs = async (req, res) => {
    try {
        const orgs = await Organization.find();
        res.send(orgs);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

export const findOrgName = async (req, res) => {
    try {
        const org = await Organization.findById(req.params.organization)
        res.send(org)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}