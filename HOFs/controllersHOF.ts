import { IImage } from "@/types/image";
import {
  deleteImageFromFirebase,
  firebaseImageUploader,
  sendError,
  sendResponse,
} from "@/utils/server";
import mongoose, { FilterQuery } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { AnyObject, ObjectSchema, ValidationError } from "yup";

type ImageKeyType = "image" | "images";

type ImageKeyTypeMap = {
  image: IImage;
  images: IImage[];
};

type GetImageKeyTypeByType<T extends ImageKeyType> = ImageKeyTypeMap[T];

type ModelType = mongoose.Model<mongoose.Document>;

interface GenericControllerProps {
  Model: ModelType;
  schema: ObjectSchema<AnyObject>;
  imageKey?: "image" | "images";
  revalidate?: () => void;
}

export const createGenericController = ({
  Model,
  schema,
  imageKey,
  revalidate,
}: GenericControllerProps) => {
  const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse,
    filter: FilterQuery<any> = {}
  ) => {
    try {
      const items = await Model.find(filter);
      if (!items)
        sendError(res, 404, `No ${Model.modelName.toLowerCase()} found!`);
      sendResponse(res, 200, items);
    } catch (error) {
      sendError(res, 500, "Server error!");
    }
  };

  const getPaginated = async (
    req: NextApiRequest,
    res: NextApiResponse,
    filter: FilterQuery<any> = {}
  ) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const parsedPageNumber = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);
      const skip = (parsedPageNumber - 1) * parsedLimit;

      const totalItems = await Model.countDocuments();

      const items = await Model.find(filter).skip(skip).limit(parsedLimit);

      if (!items)
        sendError(res, 404, `No ${Model.modelName.toLowerCase()} found!`);

      sendResponse(res, 200, {
        totalItems,
        currentPage: parsedPageNumber,
        items,
      });
    } catch (error) {
      sendError(res, 500, "Server error!");
    }
  };

  const getById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return sendError(res, 400, "Invalid ID!");
      }
      const item = await Model.findById(id);
      if (!item) {
        return sendError(res, 404, `${Model.modelName} not found!`);
      }
      sendResponse(res, 200, item);
    } catch (error) {
      console.error(`Error getting ${Model.modelName.toLowerCase()}:`, error);
      sendError(res, 500, "Internal server error!");
    }
  };

  const getSingle = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const item = await Model.findOne();
      if (!item) {
        return sendError(res, 404, `${Model.modelName} not found!`);
      }
      sendResponse(res, 200, item);
    } catch (error) {
      console.error(`Error getting ${Model.modelName.toLowerCase()}:`, error);
      sendError(res, 500, "Internal server error!");
    }
  };

  const create = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Validate the request body
      try {
        await schema.validate(req.body);
      } catch (error) {
        if (error instanceof ValidationError) {
          return sendError(res, 400, error.message);
        }
        return sendError(res, 400, "Bad request!");
      }

      let newItem;

      if (imageKey) {
        const newValue = await firebaseImageUploader<
          GetImageKeyTypeByType<typeof imageKey>
        >(req.body[imageKey]);

        newItem = new Model({
          ...req.body,
          [imageKey]: newValue,
        });
      } else {
        newItem = new Model(req.body);
      }

      await newItem.save();

      if (revalidate) {
        revalidate();
      }

      sendResponse(res, 201, newItem);
    } catch (error) {
      console.error(`Error adding ${Model.modelName.toLowerCase()}:`, error);
      sendError(res, 500, "Internal server error!");
    }
  };

  const update = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return sendError(res, 400, "Invalid ID!");
      }

      // Validate the request body
      try {
        await schema.validate(req.body);
      } catch (error) {
        if (error instanceof ValidationError) {
          return sendError(res, 400, error.message);
        }
        return sendError(res, 400, "Bad request!");
      }

      const existingItem = await Model.findById<any>(id);

      if (!existingItem) {
        return sendError(res, 404, `${Model.modelName} not found!`);
      }

      if (imageKey) {
        if (imageKey === "image") {
          if (
            req.body.image &&
            req.body.image.original.url?.startsWith("data:image")
          ) {
            const newImage = await firebaseImageUploader<IImage>(
              req.body.image
            );

            if (existingItem.image.original.url) {
              deleteImageFromFirebase(existingItem.image);
            }

            req.body.image = newImage;
          }
        } else {
          const newImages = await firebaseImageUploader<IImage[]>(
            req.body.images
          );

          // Delete removed images from Firebase Storage
          existingItem.images.forEach((existingImage: IImage) => {
            const imageUrl = existingImage.original.url;
            const imageExists = newImages.some(
              (newImage) => newImage.original.url === imageUrl
            );

            if (!imageExists) {
              deleteImageFromFirebase(existingImage);
            }
          });

          req.body.images = newImages;
        }
      }

      existingItem.set(req.body);

      await existingItem.save();

      if (revalidate) {
        revalidate();
      }

      sendResponse(res, 200, existingItem);
    } catch (error) {
      console.error(`Error updating ${Model.modelName.toLowerCase()}:`, error);
      sendError(res, 500, "Internal server error!");
    }
  };

  const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const existingItems = await Model.find();

      if (existingItems.length === 0) {
        return create(req, res);
      }

      if (existingItems.length === 1) {
        if (existingItems[0]._id.toString() === req.body._id) {
          req.query.id = req.body._id;
          return update(req, res);
        } else {
          await Model.deleteMany({ _id: { $ne: req.body._id } });
          return create(req, res);
        }
      }

      await Model.deleteMany({ _id: { $ne: req.body._id } });

      if (revalidate) {
        revalidate();
      }

      return create(req, res);
    } catch (error) {
      console.error(
        `Error creating/updating ${Model.modelName.toLowerCase()}:`,
        error
      );
      sendError(res, 500, "Internal server error!");
    }
  };

  const remove = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return sendError(res, 400, "Invalid ID!");
      }

      const item = await Model.findByIdAndDelete<any>(id);

      if (!item)
        sendError(res, 404, `No ${Model.modelName.toLowerCase()} found!`);

      if (imageKey) {
        if (imageKey === "image") {
          if (item?.image) {
            await deleteImageFromFirebase(item.image);
          }
        } else {
          await item.images.forEach((existingImage: IImage) => {
            deleteImageFromFirebase(existingImage);
          });
        }
      }

      if (revalidate) {
        revalidate();
      }

      sendResponse(res, 200, {
        message: `${Model.modelName} deleted successfully!`,
      });
    } catch (error) {
      console.error(`Error deleting ${Model.modelName.toLowerCase()}:`, error);
      sendError(res, 500, "Internal server error!");
    }
  };

  return {
    getPaginated,
    getAll,
    getById,
    getSingle,
    create,
    update,
    createOrUpdate,
    remove,
  };
};
