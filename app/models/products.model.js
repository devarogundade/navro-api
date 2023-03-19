
module.exports = mongoose => {
    const schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        images: {
            type: Array
        },
        categories: {
            type: Array,
            required: true
        },
        types: {
            type: Array,
            required: true
        },
        how_to_use: {
            type: Array
        },
        colors: {
            type: Array,
            required: true
        },
        size: {
            type: String
        },
        price: {
            type: Number
        },
        brand: {
            type: String
        },
        acne: {
            type: Boolean
        },
        blackhead: {
            type: Boolean
        },
        skinspot: {
            type: Boolean
        },
        url: {
            type: String,
            required: true
        }
    }, { timestamps: false });

    return mongoose.model("products", schema);
};