import { OurTeamModel } from "../models/our_team/our_team_model.js";

export const getOurTeamData = async (req, res, next) => {
  try {
    const teamData = await OurTeamModel.findOne();
    return res.status(200).json(teamData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getTeamsData = async (req, res, next) => {
  try {
    const teamData = await OurTeamModel.findOne();
    return res.status(200).json(teamData.team);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addOurTeamPage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const teamPage = new OurTeamModel({
      title,
      description,
    });
    const saveTeamPage = await teamPage.save();
    return res.status(201).json(saveTeamPage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editTeamPage = async (req, res, next) => {
  try {
    const { teamPageId } = req.params;
    const { title, description } = req.body;
    const teamPage = await OurTeamModel.findById(teamPageId);
    if (!teamPage) {
      const error = new Error("TeamPage doesn't exist.");
      error.statusCode = 404;
      throw error;
    }
    if (title) teamPage.title = title;
    if (description) teamPage.description = description;
    await teamPage.save();
    return res.status(200).json(teamPage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addTeamItem = async (req, res, next) => {
  try {
    const { name, jobTitle, brief } = req.body;
    const imgPath =
      req.files && req.files["profile"] ? req.files["profile"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const teamPage = await OurTeamModel.findOne();
    if (!teamPage) {
      const error = new Error("Team Page doesn't exist.");
      error.statusCode = 404;
      throw error;
    }
    const newTeamItem = {
      name,
      jobTitle,
      img: imgUrl,
      brief,
    };
    teamPage.team.push(newTeamItem);
    await teamPage.save();
    return res.status(201).json(teamPage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const reOrderTeams = async (req, res, next) => {
  try {
    const { team } = req.body;
    const teamData = await OurTeamModel.findOne();
    if (team) teamData.team = team;
    const savedTeams = await teamData.save();

    return res.status(200).json(savedTeams);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editTeamItem = async (req, res, next) => {
  try {
    const { teamItemId } = req.params;
    const { name, jobTitle, brief } = req.body;
    const teamPage = await OurTeamModel.findOne();
    if (!teamPage) {
      const error = new Error("Team Page doesn't exist.");
      error.statusCode = 404;
      throw error;
    }

    const teamItem = teamPage.team.id(teamItemId);
    if (!teamItem) {
      const error = new Error("Team item not found");
      error.statusCode = 404;
      throw error;
    }
    if (name) teamItem.name = name;
    if (jobTitle) teamItem.jobTitle = jobTitle;
    if (brief) teamItem.brief = brief;

    if (req.files && req.files["profile"]) {
      const imgPath = req.files["profile"][0].path;
      teamItem.img = `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/");
    }

    await teamPage.save();
    return res.status(200).json(teamPage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteTeamItem = async (req, res, next) => {
  try {
    const { teamItemId } = req.params;

    const teamPage = await OurTeamModel.findOne();
    if (!teamPage) {
      const error = new Error("Team Page doesn't exist.");
      error.statusCode = 404;
      throw error;
    }

    const teamIndex = teamPage.team.findIndex(
      item => item._id.toString() === teamItemId
    );

    if (teamIndex === -1) {
      const error = new Error("Team item not found");
      error.statusCode = 404;
      throw error;
    }

    teamPage.team.splice(teamIndex, 1);

    await teamPage.save();

    return res.status(200).json(teamPage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
