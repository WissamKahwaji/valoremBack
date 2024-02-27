import { propertyInterModel } from "../models/property/property_inter_model.js";

export const getInterPropertiesData = async (req, res, next) => {
  try {
    const properties = await propertyInterModel.find();
    return res.status(200).json(properties);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getInterPropertiesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await propertyInterModel.findById(id);
    return res.status(200).json(property);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addInterProperty = async (req, res, next) => {
  try {
    const {
      name,
      bio,
      description,
      location,
      price,
      propertyInterContent,
      paymentPlan,
    } = req.body;

    const newProperty = new propertyInterModel({
      name,
      bio,
      description,
      location,
      price,
      paymentPlan,
    });

    console.log(req.files);

    if (propertyInterContent && Array.isArray(propertyInterContent)) {
      newProperty.propertyInterContent = await Promise.all(
        propertyInterContent.map(async (item, index) => {
          let imgUrl = item.img;

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

    const imgPath =
      req.files && req.files["profile"] ? req.files["profile"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;

    newProperty.img = imgUrl;

    if (req.files["intercoverImg"]) {
      const coverPath =
        req.files && req.files["intercoverImg"]
          ? req.files["intercoverImg"][0].path
          : null;
      const coverUrl = coverPath
        ? `${process.env.BASE_URL}` + coverPath.replace(/\\/g, "/")
        : null;
      newProperty.coverImg = coverUrl;
    }

    if (req.files["imgs"]) {
      console.log("imgsssssssss");
      const propertyImages = req.files["imgs"];
      console.log(propertyImages);
      const imageUrls = [];
      if (!propertyImages || !Array.isArray(propertyImages)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of propertyImages) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl =
          `${process.env.BASE_URL}` + image.path.replace(/\\/g, "/");
        imageUrls.push(imageUrl);
      }
      newProperty.gallery = imageUrls;
    }
    const savedProperty = await newProperty.save();

    return res.status(201).json(savedProperty);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editInterProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const {
      name,
      bio,
      description,
      location,
      price,
      paymentPlan,
      propertyInterContent,
    } = req.body;

    const property = await propertyInterModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (name) {
      property.name = name;
    }

    if (bio) {
      property.bio = bio;
    }

    if (description) {
      property.description = description;
    }

    if (location) {
      property.location = location;
    }

    if (price) {
      property.price = price;
    }

    if (paymentPlan) {
      property.paymentPlan = paymentPlan;
    }

    if (propertyInterContent && Array.isArray(propertyInterContent)) {
      property.propertyInterContent = await Promise.all(
        propertyInterContent.map(async (item, index) => {
          let imgUrl = item.img;

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

    if (req.files && req.files["profile"]) {
      const imgPath = req.files["profile"][0].path;
      property.img = `${process.env.BASE_URL}${imgPath.replace(/\\/g, "/")}`;
    }
    if (req.files && req.files["intercoverImg"]) {
      const coverPath = req.files["intercoverImg"][0].path;
      property.coverImg = `${process.env.BASE_URL}${coverPath.replace(
        /\\/g,
        "/"
      )}`;
    }
    if (req.files && req.files["imgs"]) {
      console.log("imgs", req.files["imgs"]);
      const propertyImages = req.files["imgs"];
      const imageUrls = [];

      if (!propertyImages || !Array.isArray(propertyImages)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of propertyImages) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl = `${process.env.BASE_URL}${image.path.replace(
          /\\/g,
          "/"
        )}`;
        imageUrls.push(imageUrl);
      }

      property.gallery = imageUrls;
    }

    const updatedProperty = await property.save();

    return res.status(200).json(updatedProperty);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteInterProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("asdasd");
    const deletedProperty = await propertyInterModel.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addPropertyInterContent = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { title, description } = req.body;

    const property = await propertyInterModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const newPropertyContent = {
      title,
      description,
    };

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;

    newPropertyContent.img = imgUrl;

    property.propertyInterContent.push(newPropertyContent);

    const updatedProperty = await property.save();

    return res.status(201).json(updatedProperty);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
