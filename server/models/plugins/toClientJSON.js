/**
 * Mongoose plugin that shapes documents for the client:
 * exposes `_id` as `id` and strips internal fields.
 */
export const toClientJSON = (schema, { hide = [] } = {}) => {
  schema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = String(ret._id);
      delete ret._id;
      hide.forEach((field) => delete ret[field]);
      return ret;
    },
  });
};

export default toClientJSON;
