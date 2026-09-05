import mongoose, { Schema, Document } from 'mongoose';
export interface TriggerNode extends Document {
    id: string;
    position: {
        x: number;
        y: number;
    };
    status?: "pending" | "completed" | "failed";
    data: {
        label: string;
        body?: Record<string, unknown>;
        content?: string | Record<string, unknown>;
        scheduleTime?: String;
    };
}
export interface ActionNode extends Document {
    id: {
        type: String;
    };
    position: {
        x: {
            type: Number;
        };
        y: {
            type: Number;
        };
    };
    status: {
        type: String;
        enum: ["pending", "completed", "failed"];
    };
    data: {
        label?: {
            type: String;
        };
        body?: {
            type: Record<string, unknown>;
        };
        content?: {
            type: Record<string, unknown>;
        };
        input?: {
            type: Record<string, unknown>;
        };
        output?: {
            type: Record<string, unknown>;
        };
        prompt?: {
            type: string;
        };
        method?: {
            type: string;
            enum: ["GET", "POST", "DELETE", "PUT", "PATCH"];
        };
        url?: {
            type: string;
        };
        headers?: {
            type: Record<string, unknown>;
        };
        modelprovider?: {
            type: string;
        };
        apikey?: {
            type: string;
        };
    };
}
declare const userModel: mongoose.Model<{
    username?: string | null;
    password?: string | null;
}, {}, {}, {
    id: string;
}, Document<unknown, {}, {
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
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username?: string | null;
    password?: string | null;
}, Document<unknown, {}, {
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
declare const TriggerNodeModel: mongoose.Model<TriggerNode, {}, {}, {}, Document<unknown, {}, TriggerNode, {}, mongoose.DefaultSchemaOptions> & TriggerNode & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, TriggerNode>;
declare const workflowModel: mongoose.Model<{
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
}, {}, {}, {
    id: string;
}, Document<unknown, {}, {
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
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userID?: mongoose.Types.ObjectId | null;
    title?: string | null;
    nodes: any[];
    edges: any[];
}, Document<unknown, {}, {
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
}, Document<unknown, {}, {
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
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    category?: "action" | "condition" | "trigger" | null;
    type?: string | null;
    name?: string | null;
    description?: string | null;
}, Document<unknown, {}, {
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
export { userModel, workflowModel, nodeModel, TriggerNodeModel };
//# sourceMappingURL=db.d.ts.map