import { aboutUsModel } from "../models/about_us/about_us_model.js";
import dotenv from "dotenv";

dotenv.config();

export const getAboutData = async (req, res, next) => {
  try {
    const aboutData = await aboutUsModel.findOne();
    return res.status(200).json(aboutData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addAboutData = async (req, res, next) => {
  try {
    const { title, brief, content, ourValues, ourService } = req.body;
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const newAboutData = new aboutUsModel({
      title,
      img: imgUrl,
      brief,
      content,
      ourValues,
      ourService,
    });
    const savedAboutData = await newAboutData.save();
    return res.status(201).json(savedAboutData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editAboutData = async (req, res, next) => {
  try {
    const { title, brief, content, ourValues } = req.body;
    const aboutData = await aboutUsModel.findOne();
    if (!aboutData) {
      return res.status(404).json({ message: "aboutData not found" });
    }
    if (title) aboutData.title = title;
    if (brief) aboutData.brief = brief;
    if (ourValues) aboutData.ourValues = ourValues;

    if (content && Array.isArray(content)) {
      aboutData.content = await Promise.all(
        content.map(async (item, index) => {
          let imgUrl = item.img; // Default to existing img url

          // Check if req.files["img"] exists and if it has the expected length
          if (
            req.files &&
            req.files["img"] &&
            Array.isArray(req.files["img"]) &&
            req.files["img"].length > index
          ) {
            // Access the uploaded image path
            const imgPath = req.files["img"][index].path;
            imgUrl = `${process.env.BASE_URL}${imgPath.replace(/\\/g, "/")}`;
          }

          return {
            title: item.title,
            description: item.description,
            img: imgUrl,
          };
        })
      );
    }

    const updatedAboutData = await aboutData.save();
    return res.status(200).json(updatedAboutData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addContentItem = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const aboutUs = await aboutUsModel.findOne();

    if (!aboutUs) {
      const error = new Error("About doesn't exist.");
      error.statusCode = 404;
      throw error;
    }
    const newContentItem = {
      title,
      description,
      img: imgUrl,
    };
    aboutUs.content.push(newContentItem);
    await aboutUs.save();
    return res.status(201).json(aboutUs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editContentItem = async (req, res, next) => {
  try {
    const { contentItemId } = req.params;
    const { title, description } = req.body;

    const aboutUs = await aboutUsModel.findOne();

    if (!aboutUs) {
      const error = new Error("About Us data not found.");
      error.statusCode = 404;
      throw error;
    }

    const contentItem = aboutUs.content.id(contentItemId);

    if (!contentItem) {
      const error = new Error("Content item not found");
      error.statusCode = 404;
      throw error;
    }

    if (title) contentItem.title = title;
    if (description) contentItem.description = description;

    if (req.files && req.files["img"]) {
      const imgPath = req.files["img"][0].path;
      contentItem.img = `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/");
    }
    await aboutUs.save();

    return res.status(200).json(aboutUs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteContentItem = async (req, res, next) => {
  try {
    const { contentItemId } = req.params;

    const aboutUs = await aboutUsModel.findOne();

    if (!aboutUs) {
      const error = new Error("About Us data not found.");
      error.statusCode = 404;
      throw error;
    }
    const contentIndex = aboutUs.content.findIndex(
      item => item._id.toString() === contentItemId
    );

    if (contentIndex === -1) {
      const error = new Error("Content item not found");
      error.statusCode = 404;
      throw error;
    }

    aboutUs.content.splice(contentIndex, 1);

    await aboutUs.save();

    return res.status(200).json(aboutUs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addOurValuesItem = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const aboutUs = await aboutUsModel.findOne();

    if (!aboutUs) {
      const error = new Error("About doesn't exist.");
      error.statusCode = 404;
      throw error;
    }
    const newOurValueItem = {
      title,
      description,
    };
    aboutUs.ourValues.push(newOurValueItem);
    await aboutUs.save();
    return res.status(201).json(aboutUs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editOurValuesItem = async (req, res, next) => {
  try {
    const { ourValueItemId } = req.params;
    const { title, description } = req.body;

    const aboutUs = await aboutUsModel.findOne();

    if (!aboutUs) {
      const error = new Error("About Us data not found.");
      error.statusCode = 404;
      throw error;
    }

    const ourValueItem = aboutUs.ourValues.id(ourValueItemId);

    if (!ourValueItem) {
      const error = new Error("Our Values item not found");
      error.statusCode = 404;
      throw error;
    }

    if (title) ourValueItem.title = title;
    if (description) ourValueItem.description = description;

    await aboutUs.save();

    return res.status(200).json(aboutUs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteOurValuesItem = async (req, res, next) => {
  try {
    const { ourValueItemId } = req.params;

    const aboutUs = await aboutUsModel.findOne();

    if (!aboutUs) {
      const error = new Error("About Us data not found.");
      error.statusCode = 404;
      throw error;
    }
    const itemIndex = aboutUs.ourValues.findIndex(
      item => item._id.toString() === ourValueItemId
    );

    if (itemIndex === -1) {
      const error = new Error("Value item not found");
      error.statusCode = 404;
      throw error;
    }

    aboutUs.ourValues.splice(itemIndex, 1);

    await aboutUs.save();

    return res.status(200).json(aboutUs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
