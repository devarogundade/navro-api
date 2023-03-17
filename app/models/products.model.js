
module.exports = mongoose => {
    const schema = mongoose.Schema({
        price: {
            type: Number
        }
    }, { timestamps: false });

    return mongoose.model("products", schema);
};