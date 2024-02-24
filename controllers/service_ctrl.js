import { ServiceModel } from "../models/service_model/service_model.js";

export const getServiceData = async (req, res, next) => {
  try {
    const services = await ServiceModel.find();
    return res.status(200).json(services);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const getServiceDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await ServiceModel.findById(id);
    return res.status(200).json(service);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const addServiceData = async (req, res, next) => {
  try {
    console.log("asd");
    const { title, content } = req.body;
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const newServiceData = new ServiceModel({
      title,
      content,
      img: imgUrl,
    });

    const savedServiceData = await newServiceData.save();

    return res.status(201).json(savedServiceData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editServiceData = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { title, content } = req.body;

    const service = await ServiceModel.findById(serviceId);
    console.log(req.files["img"]);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : service.img;
    if (title) {
      service.title = title;
    }

    if (content) {
      service.content = content;
    }
    service.img = imgUrl;

    const updatedServiceData = await service.save();

    return res.status(200).json(updatedServiceData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteServiceData = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const deletedServiceData = await ServiceModel.findByIdAndDelete(serviceId);

    if (!deletedServiceData) {
      return res.status(404).json({ message: "Service data not found" });
    }

    return res
      .status(200)
      .json({ message: "Service data deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addContentToService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { title, description } = req.body;

    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const newContentItem = {
      title,
      description,
    };

    service.content.push(newContentItem);

    await service.save();

    return res.status(201).json(service);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editContentInService = async (req, res, next) => {
  try {
    const { serviceId, contentId } = req.params;
    const { title, description } = req.body;

    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const contentItem = service.content.id(contentId);

    if (!contentItem) {
      return res.status(404).json({ message: "Content item not found" });
    }

    if (title) contentItem.title = title;
    if (description) contentItem.description = description;

    await service.save();

    return res.status(200).json(service);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteContentInService = async (req, res, next) => {
  try {
    const { serviceId, contentId } = req.params;

    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.content.pull(contentId);

    await service.save();

    return res.status(200).json(service);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
