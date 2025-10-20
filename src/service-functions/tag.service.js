const {Tag} = require('../db/models')

const createOrAssociateTags = async (postInstance, tags) => {
    return await Promise.all(tags.map(async (tagName) => {
        const tagInstance = await Tag.findOne({where:{nombre:tagName}});
        return tagInstance
        ? await postInstance.addTag(tagInstance)
        : await postInstance.createTag({nombre:tagName})
    }));
};

module.exports = {createOrAssociateTags};