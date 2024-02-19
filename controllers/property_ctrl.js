import { propertyModel } from "../models/property/property_model.js";
import { propertyTypeModel } from "../models/property/property_type_model.js";

export const getPropertyTypeData = async (req, res, next) => {
  try {
    const propertyTypeData = await propertyTypeModel.find();
    return res.status(200).json(propertyTypeData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getPropertyTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const propertyTypeData = await propertyTypeModel
      .findById(id)
      .select("-properties");
    return res.status(200).json(propertyTypeData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addPropertyTypeData = async (req, res, next) => {
  try {
    const { name } = req.body;
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const newType = new propertyTypeModel({ name, img: imgUrl });
    await newType.save();

    return res.status(201).json(newType);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editPropertyTypeData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const type = await propertyTypeModel.findById(id);
    if (!type) {
      const error = new Error("Property type not found");
      error.statusCode = 404;
      throw error;
    }
    type.name = name;
    if (imgPath != null) {
      type.img = imgUrl;
    } else {
      type.img = type.img;
    }
    await type.save();
    return res.status(201).json(type);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deletePropertyTypeData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const type = await propertyTypeModel.findById(id);

    if (!type) {
      const error = new Error("Property type not found");
      error.statusCode = 404;
      throw error;
    }

    const propertiesIds = type.properties;

    await propertyModel.deleteMany({ _id: { $in: propertiesIds } });

    const deletedType = await propertyTypeModel.findByIdAndDelete(id);

    return res.status(200).json(deletedType);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getPropertyWithType = async (req, res, next) => {
  try {
    const { type } = req.query;
    let properties;
    if (type) {
      properties = await propertyTypeModel
        .find({ _id: type })
        .populate("properties");
    } else {
      properties = await propertyTypeModel.find().populate("properties");
    }

    return res.status(200).json(properties);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getPropertiesData = async (req, res, next) => {
  try {
    const properties = await propertyModel.find().populate("propertyType");
    return res.status(200).json(properties);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const getLastSixProperties = async (req, res, next) => {
  try {
    const properties = await propertyModel
      .find()
      .sort({ _id: -1 }) // Sort by _id in descending order
      .limit(6); // Limit to 6 properties
    return res.status(200).json(properties);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const getFourMinPriceProperties = async (req, res, next) => {
  try {
    const properties = await propertyModel
      .find()
      .sort({ price: 1 }) // Sort by price in ascending order
      .limit(4); // Limit to 4 properties
    return res.status(200).json(properties);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const propertyData = await propertyModel
      .findById(id)
      .populate("propertyType");
    return res.status(200).json(propertyData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getPropertiesByType = async (req, res, next) => {
  try {
    const { type } = req.query;
    const propertiesData = await propertyModel.find({ propertyType: type });
    if (!!propertiesData || propertiesData.length === 0) {
      const error = new Error("Properties not found for the given type");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(propertiesData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addProperty = async (req, res, next) => {
  try {
    const { type } = req.query;
    const {
      name,
      bio,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      space,
      breifDetails,
      paymentPlan,
      floorPlan,
      masterPlan,
      connectivity,
      locationDetails,
    } = req.body;

    const propertyTypeData = await propertyTypeModel.findById(type);
    if (!propertyTypeData) {
      const error = new Error("Property type not found");
      error.statusCode = 404;
      throw error;
    }
    const newProperty = new propertyModel({
      name,
      bio,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      space,
      propertyType: type,
      breifDetails,
      paymentPlan,
      floorPlan,
      masterPlan,
      connectivity,
      locationDetails,
    });

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;

    newProperty.img = imgUrl;

    if (req.files["coverImg"]) {
      const coverPath =
        req.files && req.files["coverImg"]
          ? req.files["coverImg"][0].path
          : null;
      const coverUrl = coverPath
        ? `${process.env.BASE_URL}` + coverPath.replace(/\\/g, "/")
        : null;
      newProperty.coverImg = coverUrl;
    }

    if (req.files["imgs"]) {
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

        const imageUrl =
          `${process.env.BASE_URL}` + image.path.replace(/\\/g, "/");
        imageUrls.push(imageUrl);
      }
      newProperty.gallery = imageUrls;
    }
    const savedProperty = await newProperty.save();
    propertyTypeData.properties.push(savedProperty._id);
    await propertyTypeData.save();
    return res.status(201).json(savedProperty);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const {
      name,
      bio,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      space,
      breifDetails,
      paymentPlan,
      floorPlan,
      masterPlan,
      connectivity,
      locationDetails,
    } = req.body;

    const property = await propertyModel.findById(propertyId);

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
    if (bedrooms) {
      property.bedrooms = bedrooms;
    }
    if (bathrooms) {
      property.bathrooms = bathrooms;
    }
    if (space) {
      property.space = space;
    }

    if (breifDetails) {
      property.breifDetails = breifDetails;
    }
    if (paymentPlan) {
      property.paymentPlan = paymentPlan;
    }
    if (floorPlan) {
      property.floorPlan = floorPlan;
    }
    if (masterPlan) {
      property.masterPlan = masterPlan;
    }

    if (connectivity) {
      property.connectivity = connectivity;
    }

    if (locationDetails) {
      property.locationDetails = locationDetails;
    }

    if (req.files && req.files["img"]) {
      const imgPath = req.files["img"][0].path;
      property.img = `${process.env.BASE_URL}${imgPath.replace(/\\/g, "/")}`;
    }
    if (req.files && req.files["coverImg"]) {
      const coverPath = req.files["coverImg"][0].path;
      property.coverImg = `${process.env.BASE_URL}${coverPath.replace(
        /\\/g,
        "/"
      )}`;
    }
    if (req.files && req.files["imgs"]) {
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

export const deleteProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;

    const deletedProperty = await propertyModel.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const propertyTypeData = await propertyTypeModel.findById(
      deletedProperty.propertyType
    );
    if (propertyTypeData) {
      propertyTypeData.properties.pull(deletedProperty._id);
      await propertyTypeData.save();
    }

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addPropertyContent = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { title, description, details } = req.body;

    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const newPropertyContent = {
      title,
      description,
      details,
    };

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;

    newPropertyContent.img = imgUrl;

    if (req.files["imgs"]) {
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

        const imageUrl =
          `${process.env.BASE_URL}` + image.path.replace(/\\/g, "/");
        imageUrls.push(imageUrl);
      }
      newPropertyContent.imgs = imageUrls;
    }

    property.propertyContent.push(newPropertyContent);

    const updatedProperty = await property.save();

    return res.status(201).json(updatedProperty);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editPropertyContent = async (req, res, next) => {
  try {
    const { propertyId, contentId } = req.params;
    const { title, description, details } = req.body;

    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const propertyContent = property.propertyContent.id(contentId);

    if (!propertyContent) {
      return res.status(404).json({ message: "Property Content not found" });
    }

    if (title) {
      propertyContent.title = title;
    }

    if (description) {
      propertyContent.description = description;
    }

    if (details) {
      propertyContent.details = details;
    }

    if (req.files && req.files["imgs"]) {
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

      propertyContent.imgs = imageUrls;
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

export const deletePropertyContent = async (req, res, next) => {
  try {
    const { propertyId, contentId } = req.params;

    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const contentIndex = property.propertyContent.findIndex(
      content => content._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Property Content not found" });
    }

    property.propertyContent.splice(contentIndex, 1);

    const updatedProperty = await property.save();

    return res.status(200).json(updatedProperty);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
