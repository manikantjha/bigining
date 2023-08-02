import Company from "@/models/company";
import { companySchema } from "@/schemas/companySchema";
import { IImage } from "@/types/image";
import {
  deleteImageFromFirebase,
  firebaseImageUploader,
  sendError,
  sendResponse,
} from "@/utils/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export const getAllCompanies = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const companies = await Company.find();
    if (!companies) sendError(res, 404, "No companies found!");
    sendResponse(res, 200, companies);
  } catch (error) {
    sendError(res, 500, "Server error!");
  }
};

export const getCompaniesPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const skip = (parsedPageNumber - 1) * parsedLimit;

    const totalCompanies = await Company.countDocuments();

    const companies = await Company.find().skip(skip).limit(parsedLimit);

    if (!companies) sendError(res, 404, "No companies found!");

    sendResponse(res, 200, {
      totalCompanies,
      currentPage: parsedPageNumber,
      companies,
    });
  } catch (error) {
    console.error("Error fetching paginated companies: ", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const getCompanyById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid company ID!");
    }
    const company = await Company.findById(id);
    if (!company) {
      return sendError(res, 404, "Company not found!");
    }
    sendResponse(res, 200, company);
  } catch (error) {
    console.error("Error getting company:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate the request body
    try {
      await companySchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const { name, image } = req.body;

    const newImage = await firebaseImageUploader<IImage>(image);

    const newCompany = new Company({
      name,
      image: newImage,
    });

    await newCompany.save();

    sendResponse(res, 201, newCompany);
  } catch (error) {
    console.error("Error adding company:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const updateCompany = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid company ID!");
    }

    // Validate the request body
    try {
      await companySchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingCompany = await Company.findById(id);
    if (!existingCompany) {
      return sendError(res, 404, "Company not found!");
    }

    const { name, image } = req.body;

    // These only need to happen if the image is changed!

    const newImage = await firebaseImageUploader<IImage>(image);

    if (
      image.original.url.startsWith("data:image") &&
      existingCompany.image.original.url
    ) {
      deleteImageFromFirebase(existingCompany.image);
    }

    existingCompany.set({
      name,
      image: newImage,
    });

    await existingCompany.save();

    sendResponse(res, 200, existingCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const deleteCompany = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const body = req.body;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid company ID!");
    }

    deleteImageFromFirebase(body.image);

    await Company.findByIdAndDelete(id);

    sendResponse(res, 200, { message: "Company deleted successfully!" });
  } catch (error) {
    console.error("Error deleting company:", error);
    sendError(res, 500, "Internal server error!");
  }
};
