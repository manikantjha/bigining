import Work, { IWorkNewDocument } from "@/models/worksNew";
import { IWorkNew, ImageSize, WorkImage } from "@/types/worksNew";
import { storage } from "firebase-admin";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// Helper function to send response
const sendResponse = <T>(res: NextApiResponse, status: number, data: T) => {
  res.status(status).json({ success: true, data });
};

// Helper function to send error response
const sendError = (res: NextApiResponse, status: number, message: string) => {
  res.status(status).json({ success: false, error: message });
};

// Function to upload image to Firebase Storage and get its URL
const uploadImageToFirebase = async (image: ImageSize): Promise<string> => {
  // Convert imageBase64 to a Buffer
  const buffer = Buffer.from(image.url.split(",")[1], "base64");

  const file = storage().bucket().file(image.path);

  // Upload the image to Firebase Storage and get its URL
  const result = await file
    .save(buffer, {
      metadata: {
        contentType: "image/webp",
      },
    })
    .then(() => {
      return file.getSignedUrl({
        action: "read",
        expires: "03-09-2500",
      });
    })
    .then((urls: any[]) => {
      const url = urls[0];
      return url;
    })
    .catch((err: any) => {
      console.log(`Unable to upload encoded file ${err}`);
    });

  return result;
};

// Function to delete image from Firebase Storage
const deleteImageFromFirebase = async (image: WorkImage) => {
  try {
    await storage().bucket().file(image.original.path).delete();
    await storage().bucket().file(image.medium.path).delete();
    await storage().bucket().file(image.small.path).delete();
  } catch (error) {
    console.error("Error deleting image from Firebase:", error);
  }
};

export const addWorkNew = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, images } = req.body;

    // Upload images to Firebase Storage and get their URLs
    const firebaseUrls: WorkImage[] = await Promise.all(
      images.map(async (image: WorkImage) => {
        const originalUrl = await uploadImageToFirebase(image.original);
        const mediumUrl = await uploadImageToFirebase(image.medium);
        const smallUrl = await uploadImageToFirebase(image.small);

        return {
          original: {
            url: originalUrl,
            width: image.original.width,
            height: image.original.height,
            path: image.original.path,
          },
          medium: {
            url: mediumUrl,
            width: image.medium.width,
            height: image.medium.height,
            path: image.medium.path,
          },
          small: {
            url: smallUrl,
            width: image.small.width,
            height: image.small.height,
            path: image.small.path,
          },
        };
      })
    );

    // Create a new work document with the Firebase URLs
    const newWork: IWorkNewDocument = new Work({
      name,
      description,
      images: firebaseUrls,
    });

    await newWork.save();
    res.status(201).json(newWork);
  } catch (error) {
    console.error("Error adding work:", error);
    res.status(500).json({ error: "Failed to add work" });
  }
};

export const updateWorkNew = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const { name, description, images } = req.body;

    const existingWork: IWorkNewDocument | null = await Work.findById(id);

    if (!existingWork) {
      return res.status(404).json({ error: "Work not found" });
    }

    // Upload new images to Firebase Storage and get their URLs
    const newImages: WorkImage[] = await Promise.all(
      images.map(async (image: WorkImage) => {
        if (image.original.url.startsWith("data:image")) {
          // New image, upload to Firebase
          const originalUrl = await uploadImageToFirebase(image.original);
          const mediumUrl = await uploadImageToFirebase(image.medium);
          const smallUrl = await uploadImageToFirebase(image.small);

          return {
            original: {
              url: originalUrl,
              width: image.original.width,
              height: image.original.height,
              path: image.original.path,
            },
            medium: {
              url: mediumUrl,
              width: image.medium.width,
              height: image.medium.height,
              path: image.medium.path,
            },
            small: {
              url: smallUrl,
              width: image.small.width,
              height: image.small.height,
              path: image.small.path,
            },
          };
        } else {
          // Existing image, keep the same URL
          return image;
        }
      })
    );

    // Delete removed images from Firebase Storage
    existingWork.images.forEach((existingImage) => {
      const imageUrl = existingImage.original.url;
      const imageExists = newImages.some(
        (newImage) => newImage.original.url === imageUrl
      );

      if (!imageExists) {
        deleteImageFromFirebase(existingImage);
      }
    });

    // Update the work data in the database with the new images
    existingWork.name = name;
    existingWork.description = description;
    existingWork.images = newImages;

    await existingWork.save();
    res.status(200).json(existingWork);
  } catch (error) {
    console.error("Error updating work:", error);
    res.status(500).json({ error: "Failed to update work" });
  }
};

export const getAllWorksNew = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const works = await Work.find({});
    sendResponse(res, 200, works);
  } catch (error) {
    sendError(res, 500, "Server Error");
  }
};

export const getWorkByIdNew = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const work = await Work.findById(id);

    if (!work) {
      return sendError(res, 404, "Work not found");
    }

    sendResponse(res, 200, work);
  } catch (error) {
    sendError(res, 500, "Server Error");
  }
};

// Controller for deleting a work
export const deleteWorkNew = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const data: IWorkNew = req.body;
    if (!data._id) {
      return res.status(404).json({ error: "Data not provided" });
    }

    // Delete images from Firebase Storage
    data.images.forEach((existingImage) => {
      deleteImageFromFirebase(existingImage);
    });

    // Remove the work record from the database
    await Work.findByIdAndDelete(new ObjectId(data._id));

    res.status(200).json({ message: "Work deleted successfully" });
  } catch (error) {
    console.error("Error deleting work:", error);
    res.status(500).json({ error: "Failed to delete work" });
  }
};

// Controller for getting paginated works
export const getPaginatedWorks = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    // Calculate the number of documents to skip
    const skipDocs = (parsedPage - 1) * parsedLimit;

    // Fetch paginated works from the database
    const totalWorks = await Work.countDocuments();
    const works: IWorkNew[] = await Work.find()
      .skip(skipDocs)
      .limit(parsedLimit);

    res.status(200).json({ totalWorks, currentPage: parsedPage, works });
  } catch (error) {
    console.error("Error getting paginated works:", error);
    res.status(500).json({ error: "Failed to get paginated works" });
  }
};

export const getPaginatedWorksForGallery = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Define the pagination parameters
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const totalWorks = await Work.countDocuments();
    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch paginated works from the database
    const works = await Work.find(
      {},
      { _id: 1, name: 1, images: { $slice: 1 } }
    )
      .skip(skip)
      .limit(limitNumber)
      .lean();

    return res.status(200).json({ totalWorks, currentPage: pageNumber, works });
  } catch (error) {
    console.error("Error fetching paginated works:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
