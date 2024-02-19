import { OurAgentsModel } from "../models/our_agents/our_agents_model.js";

export const getOurAgentsData = async (req, res, next) => {
  try {
    const ourAgentsData = await OurAgentsModel.find();
    return res.status(200).json(ourAgentsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addOurAgentsData = async (req, res, next) => {
  try {
    const { name } = req.body;
    const logoPath =
      req.files && req.files["logoImg"] ? req.files["logoImg"][0].path : null;

    const newOurAgentsData = new OurAgentsModel({
      name,
      logo: logoPath
        ? `${process.env.BASE_URL}${logoPath.replace(/\\/g, "/")}`
        : null,
    });

    const savedOurAgentsData = await newOurAgentsData.save();

    return res.status(201).json(savedOurAgentsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editOurAgentsData = async (req, res, next) => {
  try {
    const { agentId } = req.params;
    const { name } = req.body;

    const agent = await OurAgentsModel.findById(agentId);

    if (!agent) {
      return res.status(404).json({ message: "Our Agents data not found" });
    }

    if (name) {
      agent.name = name;
    }
    if (req.files && req.files["logoImg"]) {
      const imgPath = req.files["logoImg"][0].path;
      agent.img = `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/");
    }

    const updatedOurAgentsData = await agent.save();

    return res.status(200).json(updatedOurAgentsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteOurAgentsData = async (req, res, next) => {
  try {
    const { agentId } = req.params;

    const deletedOurAgentsData = await OurAgentsModel.findByIdAndDelete(
      agentId
    );

    if (!deletedOurAgentsData) {
      return res.status(404).json({ message: "Our Agents data not found" });
    }

    return res
      .status(200)
      .json({ message: "Our Agents data deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
