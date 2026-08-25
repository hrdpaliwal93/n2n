import mongoose from 'mongoose';
declare const userModel: mongoose.Model<{
    username?: string | null;
    password?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username?: string | null;
    password?: string | null;
}, mongoose.Document<unknown, {}, {
    username?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const workflowModel: mongoose.Model<{
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
}, mongoose.Document<unknown, {}, {
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const nodeModel: mongoose.Model<{
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
}, mongoose.Document<unknown, {}, {
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export { userModel, workflowModel, nodeModel };
//# sourceMappingURL=db.d.ts.map