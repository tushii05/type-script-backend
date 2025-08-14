import User, { IUserModel } from "../models/user.model";

interface QueryOptions {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
}

export const getAllUsers = async (options: QueryOptions) => {
    const { page = 1, limit = 10, sort = "createdAt", search } = options;

    const query: any = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    const users = await User.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await User.countDocuments(query);

    return {
        data: users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};


export const getUserById = async (id: string): Promise<IUserModel | null> => {
    return await User.findById(id);
};

export const createUser = async (data: Partial<IUserModel>): Promise<IUserModel> => {
    const user = new User(data);
    return await user.save();
};

export const updateUser = async (id: string, data: Partial<IUserModel>): Promise<IUserModel | null> => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string): Promise<IUserModel | null> => {
    return await User.findByIdAndDelete(id);
};
