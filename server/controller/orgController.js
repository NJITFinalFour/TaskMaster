import Organization from "../models/orgModel.js";

export const orgSignup = async (req, res) => {
    const { name } = req.body;

    try {
        const org = await Organization.signup(name);
        res.send(org);
    } catch(error) {
        res.status(400).json({ error: error.message });
    };
};

export const findAllOrgs = async (req, res) => {
    try {
        const orgs = await Organization.find();
        res.send(orgs)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}