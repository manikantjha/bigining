import connect from "@/database/connection";
import Hero from "@/models/hero";
import { FilterQuery, Model, ProjectionType } from "mongoose";

export async function getAll(
  Model: Model<any, {}, {}, {}, any, any>,
  filter: FilterQuery<any> = {},
  projection: ProjectionType<any> | null | undefined = undefined,
  isLean?: boolean
) {
  try {
    await connect();

    let items;

    if (isLean) {
      items = await Model.find(filter, projection).lean();
    } else {
      items = await Model.find(filter);
    }

    if (!items) throw new Error(`No ${Model.modelName.toLowerCase()} found!`);

    return JSON.stringify(items);
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function getPaginated(
  page: number = 1,
  limit: number = 10,
  Model: Model<any, {}, {}, {}, any, any>,
  filter: FilterQuery<any> = {},
  projection: ProjectionType<any> | null | undefined = undefined,
  isLean?: boolean
) {
  try {
    await connect();
    const skip = (page - 1) * limit;

    const totalItems = await Model.countDocuments();

    let items;

    if (isLean) {
      items = await Model.find(filter, projection)
        .skip(skip)
        .limit(limit)
        .lean();
    } else {
      items = await Model.find(filter).skip(skip).limit(limit);
    }

    if (!items) throw new Error(`No ${Model.modelName.toLowerCase()} found!`);

    return JSON.stringify({
      totalItems,
      currentPage: page,
      items,
    });
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function getSingle(Model: Model<any, {}, {}, {}, any, any>) {
  try {
    const item = await Model.findOne();
    if (!item) throw new Error(`${Model.modelName} not found!`);
    return JSON.stringify(item);
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function getHero(pageId: string) {
  try {
    await connect();
    if (!pageId) throw new Error("Page ID not provided!");
    const hero = await Hero.findOne({ pageId });
    if (!hero) throw new Error("No data found!");
    return JSON.stringify(hero);
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function getEntityStaticPaths(
  limit: number,
  Model: Model<any, {}, {}, {}, any, any>
) {
  try {
    await connect();
    const totalItems = await Model.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const lstStaticPaths = [];

    for (let i = 0; i < totalPages; i++) {
      lstStaticPaths.push({ params: { page: `${i + 1}` } });
    }

    return JSON.stringify(lstStaticPaths);
  } catch (error) {
    return JSON.stringify(error);
  }
}
