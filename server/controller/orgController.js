import Organization from "../models/orgModel";

export const orgSignup = async (req, res) => {
    const name = req.body.name;

    try {
        const org = await Organization.signup(name);
    } catch(error) {
        res.status(400).json({ error: error.message });
    };
};