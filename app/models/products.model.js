
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
        category: {
            type: Array,
            required: true
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
        url: {
            type: String,
            required: true
        }
    }, { timestamps: false });

    return mongoose.model("products", schema);
};